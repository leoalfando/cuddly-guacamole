import { TransactionType } from '../../commons/Enum';

export default class TransactionPayload{
  amount!: number;
  transactionCode!: TransactionType;
  accountId!: string;
}
