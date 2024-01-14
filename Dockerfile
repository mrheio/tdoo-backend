FROM node:20.11-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build
RUN npm run db:generate


FROM node:20.11-alpine AS server

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY --from=builder ./app/dist ./dist
COPY --from=builder ./app/node_modules/.prisma/client  ./node_modules/.prisma/client

EXPOSE 8080

CMD ["npm", "start"]