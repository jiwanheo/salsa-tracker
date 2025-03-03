FROM node:18 AS builder

WORKDIR /ui

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# HOOK IT UP TO NGINX