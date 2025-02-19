# Fase 1: Build del frontend
FROM node:18-alpine AS builder

WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# Fase 2: Serve la build con Nginx
FROM nginx:alpine

# Copia i file della build nella cartella di Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia una configurazione personalizzata di Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Espone la porta 80 per il web server
EXPOSE 80

# Avvia Nginx
CMD ["nginx", "-g", "daemon off;"]
