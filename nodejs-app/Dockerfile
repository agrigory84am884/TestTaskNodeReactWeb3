# Use Node.js base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install -g typescript
RUN npm install -g ts-node-dev
RUN npm install

# Copy the source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
