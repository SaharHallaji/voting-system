# Use the official Node.js image as a base
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN pnpm run build

# Expose the port that your application will run on
EXPOSE 5000

# Command to run the application
CMD ["pnpm", "start"]
