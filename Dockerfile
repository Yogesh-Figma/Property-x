# Stage 1: Build React App
FROM node:18-alpine as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve React App with NGINX
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom NGINX configuration file
EXPOSE 80
 # Optional: You can add a custom NGINX configuration file if needed
CMD ["nginx", "-g", "daemon off;"] 