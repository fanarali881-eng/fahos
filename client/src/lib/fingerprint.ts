/**
 * Browser Fingerprint Collector
 * Collects browser/device characteristics to verify real human visitors
 * when Turnstile fails to load (e.g., tracking prevention blocks it).
 * 
 * This does NOT track users - it only checks if the browser is real.
 * Bots (headless browsers) have very different fingerprints than real browsers.
 */

export interface BrowserFingerprint {
  // Screen info
  screenWidth: number;
  screenHeight: number;
  colorDepth: number;
  pixelRatio: number;
  
  // Browser info
  language: string;
  languages: string[];
  timezone: string;
  timezoneOffset: number;
  cookiesEnabled: boolean;
  doNotTrack: string | null;
  
  // Hardware
  hardwareConcurrency: number;
  maxTouchPoints: number;
  platform: string;
  
  // Canvas fingerprint (hash only - not tracking, just bot detection)
  canvasHash: string;
  
  // WebGL info
  webglVendor: string;
  webglRenderer: string;
  
  // Fonts detection (count only)
  fontsCount: number;
  
  // Behavior signals
  hasSessionStorage: boolean;
  hasLocalStorage: boolean;
  hasIndexedDB: boolean;
  
  // Timestamp
  collectedAt: number;
}

function getCanvasHash(): string {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 50;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "no_canvas";
    
    ctx.textBaseline = "top";
    ctx.font = "14px Arial";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText("Browser Test", 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText("Browser Test", 4, 17);
    
    const dataUrl = canvas.toDataURL();
    // Simple hash
    let hash = 0;
    for (let i = 0; i < dataUrl.length; i++) {
      const char = dataUrl.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return hash.toString(36);
  } catch {
    return "error";
  }
}

function getWebGLInfo(): { vendor: string; renderer: string } {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return { vendor: "no_webgl", renderer: "no_webgl" };
    
    const debugInfo = (gl as WebGLRenderingContext).getExtension("WEBGL_debug_renderer_info");
    if (!debugInfo) return { vendor: "no_debug", renderer: "no_debug" };
    
    return {
      vendor: (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || "unknown",
      renderer: (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "unknown",
    };
  } catch {
    return { vendor: "error", renderer: "error" };
  }
}

function countFonts(): number {
  const testFonts = [
    "Arial", "Verdana", "Times New Roman", "Courier New", "Georgia",
    "Palatino", "Garamond", "Comic Sans MS", "Impact", "Lucida Console",
    "Tahoma", "Trebuchet MS", "Arial Black", "Helvetica",
  ];
  
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return 0;
    
    const baseFonts = ["monospace", "sans-serif", "serif"];
    const testString = "mmmmmmmmmmlli";
    const testSize = "72px";
    
    const baseWidths: Record<string, number> = {};
    for (const base of baseFonts) {
      ctx.font = `${testSize} ${base}`;
      baseWidths[base] = ctx.measureText(testString).width;
    }
    
    let count = 0;
    for (const font of testFonts) {
      for (const base of baseFonts) {
        ctx.font = `${testSize} '${font}', ${base}`;
        if (ctx.measureText(testString).width !== baseWidths[base]) {
          count++;
          break;
        }
      }
    }
    return count;
  } catch {
    return -1;
  }
}

export function collectFingerprint(): BrowserFingerprint {
  const webgl = getWebGLInfo();
  
  return {
    screenWidth: window.screen?.width || 0,
    screenHeight: window.screen?.height || 0,
    colorDepth: window.screen?.colorDepth || 0,
    pixelRatio: window.devicePixelRatio || 1,
    
    language: navigator.language || "",
    languages: Array.from(navigator.languages || []),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    timezoneOffset: new Date().getTimezoneOffset(),
    cookiesEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack,
    
    hardwareConcurrency: navigator.hardwareConcurrency || 0,
    maxTouchPoints: navigator.maxTouchPoints || 0,
    platform: navigator.platform || "",
    
    canvasHash: getCanvasHash(),
    
    webglVendor: webgl.vendor,
    webglRenderer: webgl.renderer,
    
    fontsCount: countFonts(),
    
    hasSessionStorage: !!window.sessionStorage,
    hasLocalStorage: !!window.localStorage,
    hasIndexedDB: !!window.indexedDB,
    
    collectedAt: Date.now(),
  };
}
