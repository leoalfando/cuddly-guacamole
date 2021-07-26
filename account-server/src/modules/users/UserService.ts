import { ErrorStatus } from './../commons/ErrorStatus';
import UserRepository from './repositories/UserRepository';
import 'reflect-metadata';
import { ResponseOutput } from '../commons/ResponseOutput';
import UserCriteriaDto from './dtos/UserCriteriaDto';
import UserConverter from './converters/UserConverter';
import UserListDto from './dtos/UserListDto';
import * as _ from 'lodash';

const userRepository = new UserRepository();
const userConverter = new UserConverter();
export default class UserService {
  public async getUserList(criteriaDto:UserCriteriaDto): Promise<ResponseOutput> {
    const criteria = await userConverter.convertToCriteriaEntity(criteriaDto);

    const [result, totalRecord] = await userRepository.getUserList(criteria);
    const userListDto = new UserListDto();
    if (!_.isEmpty(result)) {
      userListDto.data =  await Promise.all(_.map(result, async (data) => {
          const result = await userConverter.convertToDto(data);
          return result;
      }));
      userListDto.pagination.limit = criteria.limit;
      userListDto.pagination.page = criteria.page;
      userListDto.pagination.total = totalRecord;
      userListDto.pagination.calcNextPageToken();
    }
    return ResponseOutput.createOkResponse(userListDto);
  }

  public async getUserById(id: number): Promise<ResponseOutput>{
    if(_.isNil(id)|| id < 1){
      return ResponseOutput.createBadRequestResponse(ErrorStatus.USER_GET_USER_ID_MANDATORY);
    }
    const userEntity = await userRepository.getUserById(id);
    if(userEntity){
      const userDto = await userConverter.convertToDto(userEntity);
      return ResponseOutput.createOkResponse(userDto);
    }
    return ResponseOutput.createNotFoundRequestResponse();
  }
}
