import { TransactionType } from '../../commons/Enum';
import ITransactionEntity from '../interfaces/ITransactionEntity';

export default class TransactionEntity implements ITransactionEntity {
  id!: string;
  amount: number;
  transactionCode: TransactionType;
  createdDate: Date;
  accountId: number;
}
