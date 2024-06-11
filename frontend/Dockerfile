# Imagen de node en su version 18
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Iniciando app
CMD ["npm", "start"]