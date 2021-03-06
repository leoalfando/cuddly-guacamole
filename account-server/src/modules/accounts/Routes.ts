import { Request, Response } from 'express';
import AccountService from './AccountService';

const accountService = new AccountService();

export default [
    {
        path: '/api/v1/accounts',
        method: 'post',
        handler: [
            async (req: Request, res: Response): Promise<void> => {
                const { body } = req;
                const result = await accountService.create(body);
                res.status(result.statusCode).send(result.body);
            },
        ],
    },{
        path: '/api/v1/accounts',
        method: 'get',
        handler: [
            async (req: Request, res: Response): Promise<void> => {
                const { query } = req;
                const result = await accountService.getAccounts(query.userId as string);
                res.status(result.statusCode).send(result.body);
            },
        ],
    }
];
