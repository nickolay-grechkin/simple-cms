FROM node:18-alpine

WORKDIR /app

COPY client/package*.json ./
RUN npm install

EXPOSE 3000
CMD ["npm", "run", "dev"]