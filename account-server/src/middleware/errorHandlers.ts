/* eslint-disable @typescript-eslint/no-unused-vars */

import {
    Request,
    Response,
    NextFunction,
    Router,
} from 'express';
import * as ErrorHandler from '../utils/errorHandler/ErrorHandler';

const handle404Error = (router: Router): void => {
    router.use(() => {
        ErrorHandler.notFoundError();
    });
};

const handleClientError = (router: Router): void => {
    router.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
        ErrorHandler.clientError(err, res, next);
    });
};

const handleServerError = (router: Router): void => {
    router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
        ErrorHandler.serverError(err, res /* next */);
    });
};

export default [handle404Error, handleClientError, handleServerError];
