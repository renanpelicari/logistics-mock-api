# Use Node.js v14 LTS as the base image
FROM node:18.7-alpine

# Create a new directory to copy files into
WORKDIR /app

# Copy package.json and package-lock.json files to the work directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the work directory
COPY . .

# Run the build command
RUN npm run build

# Expose the API port
EXPOSE 4000

# Build and Start the API server
CMD ["npm", "start"]