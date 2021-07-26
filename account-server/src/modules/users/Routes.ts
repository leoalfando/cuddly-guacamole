import { Request, Response } from 'express';
import UserCriteriaDto from './dtos/UserCriteriaDto';
import UserService from './UserService';

const userService = new UserService();

export default [
    {
        path: '/api/v1/users',
        method: 'get',
        handler: [
            async (req: Request, res: Response): Promise<void> => {
                const { query } = req;
                const result = await userService.getUserList(query as unknown as UserCriteriaDto);
                res.status(result.statusCode).send(result.body);
            },
        ],
    },
];
