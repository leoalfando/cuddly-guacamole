import { TransactionType } from '../../commons/Enum';
import TransactionEntity from '../entities/TransactionEntity';
import { v4 as uuidv4 } from 'uuid';

const transactions: (TransactionEntity)[]= [
    {
        id: "sampleid1",
        transactionCode : TransactionType.CREDIT,
        amount: 10000,
        accountId: 1,
        createdDate : new Date()
    },
    {
        id: "sampleid2",
        transactionCode : TransactionType.DEBIT,
        amount: 100,
        accountId: 1,
        createdDate : new Date()
    }
];

export default class TransactionRepository {
  public async create (entity: TransactionEntity): Promise<string>{
      entity.id = uuidv4();
      transactions.push(entity);
      return entity.id;
  };

  public async getTransactionById(id: string): Promise<TransactionEntity>{
      return transactions?.find(t=>t.id===id);
  };
}
