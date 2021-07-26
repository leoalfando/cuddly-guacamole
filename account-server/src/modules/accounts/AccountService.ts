// import AccountRepository from './repositories/AccountRepository';
import 'reflect-metadata';
import { ResponseOutput } from '../commons/ResponseOutput';
import { ErrorStatus } from '../commons/ErrorStatus';
import AccountDto from './dtos/AccountDto';
import AccountConverter from './converters/AccountConverter';
import AccountDomain from './domains/AccountDomain';
import AccountRepository from './repositories/AccountRepository';
import * as _ from 'lodash';
import UserService from '../users/UserService';

const accountRepository = new AccountRepository();
const accountConverter = new AccountConverter();
const accountDomain = new AccountDomain();
const userService = new UserService();
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
      return ResponseOutput.createCreatedRequestResponse(newDto);
    }
    return ResponseOutput.createInternalServerErrorRequestResponse(ErrorStatus.ACCOUNT_CREATE_FAILED);
  }
}
