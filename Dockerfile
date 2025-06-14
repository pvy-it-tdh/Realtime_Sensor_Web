# Base image for Node v20
FROM node:20
# Creating app directory
WORKDIR /app
# Copying package.json and package-lock.json
COPY package*.json ./
# Installing dependencies
RUN npm install 
# Copying the rest of the application code
COPY . .
# Exposing port 3000
EXPOSE 3000
# Starting the application
CMD ["npm","run", "dev"]

