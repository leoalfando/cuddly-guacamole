import { TransactionType } from '../../commons/Enum';

export default class TransactionDto {
  id!: number;
  amount: number;
  transactionCode: TransactionType;
  createdDate: Date;
  createdBy: number;
}
