import AccountRepository from './repositories/AccountRepository';
import AccountEntity from './entities/AccountEntity';
import 'reflect-metadata';
import { ResponseOutput } from '../commons/ResponseOutput';

const accountRepository = new AccountRepository();

export default class AccountService {
  public getAccounts = async (keyword:string): Promise<ResponseOutput> => {
    const result = await accountRepository.getAccounts(keyword);
    const response = ResponseOutput.createOkResponse(result);
    return response;
  }
}
