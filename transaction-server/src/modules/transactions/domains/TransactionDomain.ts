import { TransactionType } from './../../commons/Enum';
import { ErrorStatus } from '../../commons/ErrorStatus';
import TransactionCriteriaEntity from '../entities/TransactionCriteriaEntity';
import * as _ from 'lodash';
import TransactionEntity from '../entities/TransactionEntity';

export default class TransactionDomain {
  public async validateCriteria(criteria: TransactionCriteriaEntity): Promise<ErrorStatus[]> {
    const errors: ErrorStatus[] = [];
    if(_.isNil(criteria?.accountId)){
      errors.push(ErrorStatus.TRANSACTION_GET_LIST_ACCOUNT_ID_MANDATORY);
    }
    if(!(Object.values(TransactionType).includes(criteria?.transactionCode))){
      errors.push(ErrorStatus.TRANSACTION_GET_LIST_TYPE_INVALID);
    }
    return errors;
  }

  public async validateCreate(entity: TransactionEntity): Promise<ErrorStatus[]> {
    const errors: ErrorStatus[] = [];
    if(_.isNil(entity?.accountId)){
      errors.push(ErrorStatus.TRANSACTION_CREATE_ACCOUNT_ID_MANDATORY);
    }
    if(_.isNil(entity?.amount)|| entity?.amount < 1){
      errors.push(ErrorStatus.TRANSACTION_CREATE_AMOUNT_MANDATORY);
    }
    if(!(Object.values(TransactionType).includes(entity?.transactionCode))){
      errors.push(ErrorStatus.TRANSACTION_CREATE_TYPE_INVALID);
    }
    return errors;
  }

  public processCreate(entity: TransactionEntity): void{
    entity.createdDate = new Date();
  }
}
