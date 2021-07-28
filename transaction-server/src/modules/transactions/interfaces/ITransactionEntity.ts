import { TransactionType } from './../../commons/Enum';
export default interface TransactionEntity {
  id: string;
  amount: number;
  transactionCode: TransactionType;
  createdDate: Date;
  accountId: string;
}
