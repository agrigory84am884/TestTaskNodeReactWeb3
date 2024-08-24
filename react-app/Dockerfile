# Base image
FROM node:22

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install -g typescript
RUN npm install -g ts-node-dev
RUN npm install

# Copy application files
COPY . .

# Expose port
EXPOSE 3000

