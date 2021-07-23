import { Request, Response, NextFunction } from 'express';
import { HTTP400Error } from '../utils/errorHandler/HttpErrors';

const checkSearchParams = (
    req: Request,
    _res: Response,
    next: NextFunction,
): void => {
    if (!req.query.keyword) {
        throw new HTTP400Error('Missing keyword parameter');
    } else {
        next();
    }
};

export { checkSearchParams };
export default { checkSearchParams };
