import { TransactionOrderBy, TransactionType } from '../../commons/Enum';
import ITransactionEntity from '../interfaces/ITransactionEntity';

export default class TransactionCriteriaEntity{
  transactionCode: TransactionType;
  accountId: number;
  orderBy: TransactionOrderBy;
  page: number;
  limit: number;
}
