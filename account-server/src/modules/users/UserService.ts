import UserRepository from './repositories/UserRepository';
import 'reflect-metadata';
import { ResponseOutput } from '../commons/ResponseOutput';
import { ErrorStatus } from '../commons/ErrorStatus';

const userRepository = new UserRepository();

export default class UserService {
  public getUsers = async (keyword:string): Promise<ResponseOutput> => {
    if(!keyword || keyword?.length < 3){
      return ResponseOutput.createBadRequestResponse(ErrorStatus.ACCOUNT_GET_LIST_MIN_KEYWORD);
    }
    const result = await userRepository.getUsers(keyword);
    if(result?.length < 1){
      return ResponseOutput.createNotFoundRequestResponse();
    }
    const response = ResponseOutput.createOkResponse(result);
    return response;
  }
}
