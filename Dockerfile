FROM node:12 as builder_front

WORKDIR /app

COPY ./frontend/package.json ./

RUN npm install

COPY ./frontend/ ./

RUN npm run build


FROM node:12 as builder_back

WORKDIR /app

COPY ./backend/package.json ./

RUN npm install

COPY ./backend/ ./

RUN npm run build


FROM gcr.io/distroless/nodejs:12

WORKDIR /app

COPY --from=builder_front /app/build ./client

COPY --from=builder_back /app ./

CMD ["dist/main.js"]