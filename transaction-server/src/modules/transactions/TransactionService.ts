import 'reflect-metadata';
import { ErrorStatus } from '../commons/ErrorStatus';
import { ResponseOutput } from '../commons/ResponseOutput';
import TransactionConverter from './converters/TransactionConverter';
import TransactionDto from './dtos/TransactionDto';
import TransactionRepository from './repositories/TransactionRepository';
import * as _ from 'lodash';

const transactionConverter = new TransactionConverter();
const transactionRepository = new TransactionRepository();
export default class TransactionService {
  public async create(dto: TransactionDto): Promise<ResponseOutput> {
    const entity = await transactionConverter.convertFromDto(dto);
    if(_.isEmpty(entity)){
      return ResponseOutput.createBadRequestResponse(ErrorStatus.TRANSACTION_CREATE_REQ_NOT_FOUND);
    }
    const newId = await transactionRepository.create(entity);
    if(newId){
      const newTransaction = await transactionRepository.getTransactionById(newId);
      const newDto = transactionConverter.convertToDto(newTransaction);
      return ResponseOutput.createCreatedRequestResponse(newDto);
    }
    return ResponseOutput.createInternalServerErrorRequestResponse(ErrorStatus.TRANSACTION_CREATE_FAILED);
  }
}
