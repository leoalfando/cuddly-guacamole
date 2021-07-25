import { TransactionType } from './../../commons/Enum';
import { ErrorStatus } from '../../commons/ErrorStatus';
import TransactionCriteriaEntity from '../entities/TransactionCriteriaEntity';
import * as _ from 'lodash';
import TransactionEntity from '../entities/TransactionEntity';

export default class TransactionDomain {
  public async validateCriteria(criteria: TransactionCriteriaEntity): Promise<ErrorStatus[]> {
    const errors: ErrorStatus[] = [];
    if(_.isNil(criteria?.accountId)|| criteria?.accountId < 1){
      errors.push(ErrorStatus.TRANSACTION_GET_LIST_ACCOUNT_ID_MANDATORY);
    }
    if(!(Object.values(TransactionType).includes(criteria?.transactionCode))){
      errors.push(ErrorStatus.TRANSACTION_GET_LIST_TYPE_INVALID);
    }
    return errors;
  }
}
