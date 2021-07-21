import { Request, Response } from 'express';
import AccountService from './AccountService';

const accountService = new AccountService();

export default [
    {
        path: '/api/v1/accounts',
        method: 'get',
        handler: [
            async (_req: Request, res: Response): Promise<void> => {
                const result = await accountService.getAccounts();
                res.status(200).send(result);
            },
        ],
    },
];
