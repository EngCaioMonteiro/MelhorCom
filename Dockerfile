FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18
WORKDIR /app
COPY --from=builder /app /app
RUN npm install --production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
