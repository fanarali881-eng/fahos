FROM node:18-alpine

WORKDIR /usr/src/app

# Copy server package files
COPY server/package*.json ./

# Install dependencies
RUN npm install --production

# Copy server code
COPY server/ ./

# Expose port
EXPOSE 8080

ENV NODE_ENV=production
ENV PORT=8080

CMD ["node", "index.js"]
