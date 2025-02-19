FROM node:18-alpine

WORKDIR /app

ARG CLIENT_URL
ENV CLIENT_URL=$CLIENT_URL
# Copia i file di package.json e installa le dipendenze
COPY package.json package-lock.json ./
RUN npm install

# Copia tutto il codice sorgente
COPY . .

# Esegui la build di TypeScript
RUN npm run build

# Espone la porta 3000
EXPOSE 3000

# Avvia il server
CMD ["node", "dist/src/index.js"]
