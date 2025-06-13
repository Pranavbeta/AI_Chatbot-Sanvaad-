# Stage 1: Build the TypeScript application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install all dependencies including dev dependencies to build the app
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript application
RUN npm run build

# Stage 2: Run the application
FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json for production dependency installation
COPY package.json ./
COPY package-lock.json ./

# Install only production dependencies (this will re-build native modules for this stage)
RUN npm install --production

# Copy the built application from the build stage
COPY --from=build /app/dist ./dist

# Expose the port the backend runs on
EXPOSE 5005

# Command to run the backend application
CMD ["node", "./dist/index.js"] 