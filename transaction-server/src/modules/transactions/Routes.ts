import { Request, Response } from 'express';
import { handleAuthorization } from '../../middleware/authorization';
import TransactionCriteriaDto from './dtos/TransactionCriteriaDto';
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
                res.status(result.statusCode).send(result.body);
            },
        ],
    },
    {
        path: '/api/v1/transactions',
        method: 'get',
        handler: [
            handleAuthorization,
            async (req: Request, res: Response): Promise<void> => {
                const { query } = req;
                const result = await transactionService.getTransactionList(query as any);
                res.status(result.statusCode).send(result.body);
            },
        ],
    },
];
