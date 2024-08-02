# Stage 1: Build the React application
FROM node:18-alpine AS build

WORKDIR /rainy-words-adventure-fe

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the built application with Nginx
FROM nginx:1.27.0

COPY --from=build /rainy-words-adventure-fe/dist /usr/share/nginx/html

# Optional: Copy Nginx configuration file if needed
# COPY nginx.conf /etc/nginx/nginx.conf
