import 'reflect-metadata';
import { ErrorStatus } from '../commons/ErrorStatus';
import { ResponseOutput } from '../commons/ResponseOutput';
import TransactionConverter from './converters/TransactionConverter';
import TransactionDto from './dtos/TransactionDto';
import TransactionRepository from './repositories/TransactionRepository';
import * as _ from 'lodash';
import TransactionCriteriaDto from './dtos/TransactionCriteriaDto';
import TransactionListDto from './dtos/TransactionListDto';

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

  public async getTransactionList(criteria: TransactionCriteriaDto): Promise<ResponseOutput> {
    const criteriaDto = transactionConverter.convertToCriteriaEntity(criteria);
    const [result, totalRecord] = await transactionRepository.getTransactionList(criteriaDto);
    const transactionListDto = new TransactionListDto();
    if (!_.isEmpty(result)) {
      transactionListDto.data =  await Promise.all(_.map(result, async (data) => {
          const result = await transactionConverter.convertToDto(data);
          return result;
      }));
      transactionListDto.pagination.limit = criteriaDto.limit;
      transactionListDto.pagination.page = criteriaDto.page;
      transactionListDto.pagination.total = totalRecord;
      transactionListDto.pagination.calcNextPageToken();
    }

    return ResponseOutput.createOkResponse(transactionListDto);
  }
}
