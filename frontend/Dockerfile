# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app files
COPY . .

# Build React app
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Expose port 3000
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Start Node.js server
CMD [ "npm", "start" ]
