import { TransactionType } from './../../commons/Enum';
export default interface TransactionEntity {
  id: number;
  amount: number;
  transactionCode: TransactionType;
  createdDate: Date;
  createdBy: number;
}
