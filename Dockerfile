# Base image
FROM node:18

# Install pnpm
RUN npm install -g pnpm

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy application files
COPY . .

# Build the application
RUN pnpm run build

# Expose port
EXPOSE 5000

# Start the application
CMD ["pnpm", "start"]
