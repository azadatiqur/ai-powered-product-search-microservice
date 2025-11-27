FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
RUN npm ci --production=false

COPY src ./src

RUN npm run build

EXPOSE 8003

CMD ["npm", "start"]
