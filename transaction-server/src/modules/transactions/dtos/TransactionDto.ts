import { TransactionType } from '../../commons/Enum';

export default class TransactionDto {
  id!: string;
  amount: number;
  transactionCode: TransactionType;
  createdDate: Date;
  accountId: number;
}
