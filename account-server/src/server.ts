/* eslint-disable no-console */
import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config();

import { applyMiddleware, applyRoutes } from './utils/errorHandler';
import middleware from './middleware';
import errorHandlers from './middleware/errorHandlers';
import routes from './modules';

const { PORT = 8080 } = process.env;
process.on('uncaughtException', (e) => {
    console.log(e);
    process.exit(1);
});

process.on('unhandledRejection', (e) => {
    console.log(e);
    process.exit(1);
});

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const server = http.createServer(router);


server.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}...`);
});
