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
  public getUserList = async (criteriaDto:UserCriteriaDto): Promise<ResponseOutput> => {
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
}
