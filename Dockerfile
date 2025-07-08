# Stage 1: Build the Angular application
FROM node:24-alpine3.22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve the application from Nginx
FROM nginx:alpine
COPY --from=build /app/dist/nopish-frontend/browser /usr/share/nginx/html
EXPOSE 80
