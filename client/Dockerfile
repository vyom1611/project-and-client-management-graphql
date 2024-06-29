# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the client code to the container
COPY . .

# Build the React app
RUN npm run build

# Expose the port on which the React app will run
EXPOSE 80

# Define the command to serve the built React app
CMD ["npm", "run", "start"]
