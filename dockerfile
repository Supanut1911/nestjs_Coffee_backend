FROM node:14.15.0 AS builder
WORKDIR /app/builder
# COPY ./package.json ./
COPY src/coffee apps/coffee
RUN npm install
COPY . .
RUN npm run build

FROM node:14.15.0-alpine3.12
WORKDIR /usr/src/app
COPY --from=builder /app/builder/dist/src/coffee ./
EXPOSE 3000
CMD ["npm", "run", "start:prod"]


