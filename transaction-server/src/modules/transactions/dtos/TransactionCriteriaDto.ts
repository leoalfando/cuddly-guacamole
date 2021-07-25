import { TransactionType, TransactionOrderBy } from '../../commons/Enum';

export default class TransactionCriteriaDto {
  transactionCode: TransactionType;
  accountId: string;
  orderBy:TransactionOrderBy;
  page: string;
  limit: string;
}
