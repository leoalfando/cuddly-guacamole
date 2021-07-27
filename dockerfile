# Stage 1 : Build Account Server
FROM node:14.15.3-alpine3.12

WORKDIR /usr/src/app/account-server/
COPY account-server/package*.json ./
RUN npm install -qy
COPY account-server/ ./

ENV PORT 8080

EXPOSE 8080

CMD ["npm", "start"]
