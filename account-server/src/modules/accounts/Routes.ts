import { Request, Response } from 'express';
import AccountService from './AccountService';

const accountService = new AccountService();

export default [
    {
        path: '/api/v1/accounts',
        method: 'get',
        handler: [
            async (req: Request, res: Response): Promise<void> => {
                const { query } = req;
                const result = await accountService.getAccounts(query?.keyword as string);
                res.status(200).send(result);
            },
        ],
    },
];
