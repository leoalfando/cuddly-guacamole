import { Request, Response } from 'express';
import { handleAuthorization } from '../../middleware/authorization';
import TransactionService from './TransactionService';

const transactionService = new TransactionService();

export default [
    {
        path: '/api/v1/transactions',
        method: 'post',
        handler: [
            handleAuthorization,
            async (req: Request, res: Response): Promise<void> => {
                const { body } = req;
                const result = await transactionService.create(body);
                res.status(result.statusCode).send(result);
            },
        ],
    },
];
