import 'reflect-metadata';
import { ErrorStatus } from '../commons/ErrorStatus';
import { ResponseOutput } from '../commons/ResponseOutput';
import TransactionConverter from './converters/TransactionConverter';
import TransactionDto from './dtos/TransactionDto';
import TransactionRepository from './repositories/TransactionRepository';
import * as _ from 'lodash';
import TransactionCriteriaDto from './dtos/TransactionCriteriaDto';
import TransactionListDto from './dtos/TransactionListDto';
import TransactionCriteriaEntity from './entities/TransactionCriteriaEntity';
import { TransactionOrderBy } from '../commons/Enum';
import TransactionDomain from './domains/TransactionDomain';

const transactionConverter = new TransactionConverter();
const transactionRepository = new TransactionRepository();
const transactionDomain = new TransactionDomain();
export default class TransactionService {
  public async create(dto: TransactionDto): Promise<ResponseOutput> {
    const entity = await transactionConverter.convertFromDto(dto);

    if(_.isEmpty(entity)){
      return ResponseOutput.createBadRequestResponse(ErrorStatus.TRANSACTION_CREATE_REQ_NOT_FOUND);
    }
    const domainErrors = await transactionDomain.validateCreate(entity);
    if(domainErrors.length > 0){
      return ResponseOutput.createBadRequestResponse(domainErrors);
    }
    await transactionDomain.processCreate(entity);
    const newId = await transactionRepository.create(entity);
    if(newId){
      const newTransaction = await transactionRepository.getTransactionById(newId);
      const newDto = transactionConverter.convertToDto(newTransaction);
      return ResponseOutput.createCreatedRequestResponse(newDto);
    }
    return ResponseOutput.createInternalServerErrorRequestResponse(ErrorStatus.TRANSACTION_CREATE_FAILED);
  }

  public async getTransactionList(criteriaDto: TransactionCriteriaDto): Promise<ResponseOutput> {
    const criteria = await transactionConverter.convertToCriteriaEntity(criteriaDto);
    this.setDefaultCriteria(criteria);
    const domainErrors = await transactionDomain.validateCriteria(criteria);
    if(domainErrors.length > 0){
      return ResponseOutput.createBadRequestResponse(domainErrors);
    }
    const [result, totalRecord] = await transactionRepository.getTransactionList(criteria);
    const transactionListDto = new TransactionListDto();
    if (!_.isEmpty(result)) {
      transactionListDto.data =  await Promise.all(_.map(result, async (data) => {
          const result = await transactionConverter.convertToDto(data);
          return result;
      }));
      transactionListDto.pagination.limit = criteria.limit;
      transactionListDto.pagination.page = criteria.page;
      transactionListDto.pagination.total = totalRecord;
      transactionListDto.pagination.calcNextPageToken();

    }
    return ResponseOutput.createOkResponse(transactionListDto);
  }

  private setDefaultCriteria(criteria: TransactionCriteriaEntity){
    if(_.isNil(criteria?.limit)){
      criteria.limit = 5;
    }
    if(_.isNil(criteria?.page)){
      criteria.page = 1;
    }
    if(_.isNil(criteria?.orderBy)){
      criteria.orderBy = TransactionOrderBy.dateDesc;
    }
  }
}
