import AccountDto from "../dtos/AccountDto";
import AccountEntity from "../entities/AccountEntity";
import * as _ from 'lodash';
export default class AccountConverter {
  public convertFromDto (dto: AccountDto): AccountEntity {
    if(!_.isEmpty(dto)){
      const result = new AccountEntity();
      result.userId = dto.userId;
      result.type = dto.type;
      return result;
    }
    return null;
  };

  public convertToDto(entity: AccountEntity): AccountDto {
    if(!_.isEmpty(entity)){
      const result = new AccountDto();
      result.id = entity.id;
      result.userId = entity.userId;
      result.type = entity.type;
      result.createdDate = entity.createdDate;
      return result;
    }
    return null;
  };
}
