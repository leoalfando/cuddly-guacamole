import { Request, Response } from 'express';
import TransactionService from './TransactionService';

const transactionService = new TransactionService();

export default [
    {
        path: '/api/v1/transactions',
        method: 'post',
        handler: [
            async (req: Request, res: Response): Promise<void> => {
                const { body } = req;
                const result = await transactionService.create(body);
                res.status(200).send(result);
            },
        ],
    },
];
