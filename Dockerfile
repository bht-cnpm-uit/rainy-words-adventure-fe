FROM node:18-alpine AS build

WORKDIR /bhtcnpm/rainy-words-adventure-fe

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.27.0-alpine

COPY --from=build /bhtcnpm/rainy-words-adventure-fe/dist /usr/share/nginx/html