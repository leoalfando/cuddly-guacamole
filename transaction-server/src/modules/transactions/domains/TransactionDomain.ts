import { TransactionType } from './../../commons/Enum';
import { ErrorStatus } from '../../commons/ErrorStatus';
import TransactionCriteriaEntity from '../entities/TransactionCriteriaEntity';
import * as _ from 'lodash';

export default class TransactionDomain {
  public async validateCriteria(criteria: TransactionCriteriaEntity): Promise<ErrorStatus[]> {
    const errors: ErrorStatus[] = [];
    if(_.isNull(criteria.accountId)){
      errors.push(ErrorStatus.TRANSACTION_GET_LIST_ACCOUNT_ID_MANDATORY);
    }
    if(!(Object.values(TransactionType).includes(criteria.transactionCode))){
      errors.push(ErrorStatus.TRANSACTION_GET_LIST_TRANSACTION_TYPE_INVALID);
    }
    return errors;
  }
}
