import { AccountType } from './../../commons/Enum';
import { ErrorStatus } from '../../commons/ErrorStatus';
import * as _ from 'lodash';
import AccountEntity from '../entities/AccountEntity';

export default class AccountDomain {
  public async validateCreate(entity: AccountEntity): Promise<ErrorStatus[]> {
    const errors: ErrorStatus[] = [];
    if(_.isNil(entity?.userId)|| entity?.userId < 1){
      errors.push(ErrorStatus.ACCOUNT_CREATE_USER_ID_MANDATORY);
    }
    if(!(Object.values(AccountType).includes(entity?.type))){
      errors.push(ErrorStatus.ACCOUNT_CREATE_TYPE_MANDATORY);
    }
    return errors;
  }

  public processCreate(entity: AccountEntity): void{
    entity.createdDate = new Date();
  }
}
