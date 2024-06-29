# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the server code to the container
COPY . .

# Install dependencies
RUN npm install

# Expose the port on which the server will run
EXPOSE 3000

# Define the command to run your server-side application
CMD ["node", "index.js"]
