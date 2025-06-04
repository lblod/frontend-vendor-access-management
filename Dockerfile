FROM node:22 AS builder

LABEL maintainer="info@redpencil.io"

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM semtech/ember-proxy-service:1.5.1

ENV STATIC_FOLDERS_REGEX "^/(assets|font|files|handleiding|toezicht/bestanden|@appuniversum)/"

COPY --from=builder /app/dist /app
