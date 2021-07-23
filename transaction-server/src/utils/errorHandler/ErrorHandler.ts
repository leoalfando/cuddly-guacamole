/* eslint-disable no-console */
import { Response, NextFunction } from 'express';
import { HTTPClientError, HTTP404Error } from './HttpErrors';

export const notFoundError = (): void => {
    throw new HTTP404Error('Method not found.');
};

export const clientError = (
    err: Error,
    res: Response,
    next: NextFunction,
): Response | NextFunction | void => {
    if (err instanceof HTTPClientError) {
        console.warn(err);
        return res.status(err.statusCode).send(err.message);
    }

    return next(err);
};

export const serverError = (err: Error, res: Response): Response => {
    console.error(err);
    if (process.env.NODE_ENV === 'production') {
        return res.status(500).send('Internal Server Error');
    }

    return res.status(500).send(err.stack);
};
