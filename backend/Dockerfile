FROM node:20-alpine

# Set environment to production
ENV NODE_ENV=production

WORKDIR /usr/src/app

# Copy package configuration
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy application source code
COPY . .

# Ensure the uploads directory exists and is owned by the node user
RUN mkdir -p uploads && chown -R node:node /usr/src/app

# Run the app as a non-root user for security
USER node

EXPOSE 3600

CMD ["node", "server.js"]
