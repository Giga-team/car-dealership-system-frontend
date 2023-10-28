FROM node:12.20-alpine3.10 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm build:prod


FROM nginx:1.17.2-alpine
COPY --from=build /app/dist/ngx-levi9 /usr/share/nginx/html
