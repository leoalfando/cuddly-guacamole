import UserDto from "../dtos/UserDto";
import UserEntity from "../entities/UserEntity";
import * as _ from 'lodash';
import { TransactionType } from "../../commons/Enum";
import ChildUserEntity from "../entities/ChildUserEntity";
import UserCriteriaEntity from "../entities/UserCriteriaEntity";
import UserCriteriaDto from "../dtos/UserCriteriaDto";

export default class UserConverter {
  public convertFromDto (dto: UserDto): UserEntity|ChildUserEntity|null {
    if(!_.isEmpty(dto)){
      if(!_.isEmpty(dto.guardianId)){
        const result = new ChildUserEntity();
        result.id =dto.id;
        result.firstName = dto.firstName;
        result.lastName = dto.lastName;
        result.guardianId = dto.guardianId;
      }
      else{
        const result = new UserEntity();
        result.id =dto.id;
        result.firstName = dto.firstName;
        result.lastName = dto.lastName;
      }
    }
    return null;
  };

  public convertToDto(entity: UserEntity|ChildUserEntity): UserDto|null {
    if(!_.isEmpty(entity)){
      const result = new UserDto();
      result.id = entity.id;
      result.firstName = entity.firstName;
      result.lastName = entity.lastName;
      if(entity instanceof ChildUserEntity){
        result.guardianId = entity.guardianId;
      }
      return result;
    }
    return null;
  };

  public convertToCriteriaEntity(criteriaDto: UserCriteriaDto): UserCriteriaEntity{
    if(!_.isEmpty(criteriaDto)){
      const result = new UserCriteriaEntity();
      result.keyword = criteriaDto.keyword;
      result.page = _.toNumber(_.get(criteriaDto, 'page', "0"));
      result.limit = _.toNumber(_.get(criteriaDto, 'limit', "0"));
      return result;
    }
    return null;
  }
}
