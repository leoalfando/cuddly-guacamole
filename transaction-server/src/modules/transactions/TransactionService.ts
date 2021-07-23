import 'reflect-metadata';
import { ResponseOutput } from '../commons/ResponseOutput';
import TransactionDto from './dtos/TransactionDto';

export default class TransactionService {
  public create = async (dto: TransactionDto): Promise<ResponseOutput> => {
    return null;
  }
}
