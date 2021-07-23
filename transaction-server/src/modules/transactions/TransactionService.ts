import 'reflect-metadata';
import { ResponseOutput } from '../commons/ResponseOutput';
import TransactionConverter from './converters/TransactionConverter';
import TransactionDto from './dtos/TransactionDto';
import TransactionRepository from './repositories/TransactionRepository';

const transactionConverter = new TransactionConverter();
const transactionRepository = new TransactionRepository();
export default class TransactionService {
  public async create(dto: TransactionDto): Promise<ResponseOutput> {
    const entity = transactionConverter.convertFromDto(dto);
    const newId = await transactionRepository.create(entity);
    if(newId){
      const newTransaction = await transactionRepository.getTransactionById(newId);
      const newDto = transactionConverter.convertToDto(newTransaction);
      return ResponseOutput.createCreatedRequestResponse(newDto);
    }
    return null;
  }
}
