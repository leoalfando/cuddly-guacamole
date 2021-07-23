import AccountRepository from './repositories/AccountRepository';
import 'reflect-metadata';
import { ResponseOutput } from '../commons/ResponseOutput';
import { ErrorStatus } from '../commons/ErrorStatus';

const accountRepository = new AccountRepository();

export default class AccountService {
  public getAccounts = async (keyword:string): Promise<ResponseOutput> => {
    if(!keyword || keyword?.length < 3){
      return ResponseOutput.createBadRequestResponse(ErrorStatus.ACCOUNT_GET_LIST_MIN_KEYWORD);
    }
    const result = await accountRepository.getAccounts(keyword);
    if(result?.length < 1){
      return ResponseOutput.createNotFoundRequestResponse();
    }
    const response = ResponseOutput.createOkResponse(result);
    return response;
  }
}
