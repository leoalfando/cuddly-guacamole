import { TransactionType } from '../../commons/Enum';
import ITransactionEntity from '../interfaces/ITransactionEntity';

export default class TransactionEntity implements ITransactionEntity {
  id!: number;
  amount: number;
  transactionCode: TransactionType;
  createdDate: Date;
  createdBy: number;
}
