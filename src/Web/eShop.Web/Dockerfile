FROM node:22-alpine AS build

WORKDIR /app

COPY ./package*.json ./

RUN npm install -g @angular/cli

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine AS serve

COPY ./nginx/mime.types /etc/nginx/mime.types
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build ./app/dist/e-shop.web/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
