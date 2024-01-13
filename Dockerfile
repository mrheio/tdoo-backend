FROM node:20.11

ENV HOST=0.0.0.0
ENV PORT=8080

EXPOSE ${PORT}

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci

COPY . /app

RUN npm run db:generate
RUN npm run build

CMD ["npm", "start"]