# Usa un'immagine con Node.js
FROM node:18-alpine

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file del progetto
COPY package.json package-lock.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del codice
COPY . .

# Compila TypeScript
RUN npm run build

# Espone la porta del server (modificala se necessario)
EXPOSE 3000

# Comando per avviare il server
CMD ["npm", "start"]
