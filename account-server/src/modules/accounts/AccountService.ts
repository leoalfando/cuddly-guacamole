import { TransactionType } from './../commons/Enum';
// import AccountRepository from './repositories/AccountRepository';
import 'reflect-metadata';
import { ResponseOutput } from '../commons/ResponseOutput';
import { ErrorStatus } from '../commons/ErrorStatus';
import AccountDto from './dtos/AccountDto';
import TransactionPayload from './dtos/TransactionPayload';
import AccountConverter from './converters/AccountConverter';
import AccountDomain from './domains/AccountDomain';
import AccountRepository from './repositories/AccountRepository';
import * as _ from 'lodash';
import UserService from '../users/UserService';
import TransactionRepository from '../users/repositories/TransactionRepository';

const accountRepository = new AccountRepository();
const accountConverter = new AccountConverter();
const accountDomain = new AccountDomain();
const userService = new UserService();
const transactionRepository = new TransactionRepository();
export default class AccountService {
  public async create(dto: AccountDto): Promise<ResponseOutput> {
    const entity = await accountConverter.convertFromDto(dto);
    if(_.isEmpty(entity)){
      return ResponseOutput.createBadRequestResponse(ErrorStatus.ACCOUNT_CREATE_REQ_NOT_FOUND);
    }
    const domainErrors = await accountDomain.validateCreate(entity);
    if(domainErrors.length > 0){
      return ResponseOutput.createBadRequestResponse(domainErrors);
    }
    await accountDomain.processCreate(entity);

    const getUserResponse = await userService.getUserById(entity.userId);
    if(!getUserResponse?.isOK()){
      return ResponseOutput.createBadRequestResponse(ErrorStatus.ACCOUNT_CREATE_USER_NOT_EXIST);
    }

    const newId = await accountRepository.create(entity);
    if(newId){
      const newAccount = await accountRepository.getAccountById(newId);
      const newDto = accountConverter.convertToDto(newAccount);
      if(!_.isNil(dto.amount) && dto.amount>0){
        const transactionPayload = new TransactionPayload();
        transactionPayload.amount = dto.amount;
        transactionPayload.accountId = newId;
        transactionPayload.transactionCode = TransactionType.CREDIT
        transactionRepository.createTransaction(transactionPayload);
      }
      return ResponseOutput.createCreatedRequestResponse(newDto);
    }
    return ResponseOutput.createInternalServerErrorRequestResponse(ErrorStatus.ACCOUNT_CREATE_FAILED);
  }

  public async getAccounts(userId: string): Promise<ResponseOutput> {
    const result = await accountRepository.getAccountByUserId(parseInt(userId));
    return ResponseOutput.createOkResponse(result);
  }
}
