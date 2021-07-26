import { TransactionType } from '../../commons/Enum';
import TransactionEntity from '../entities/TransactionEntity';
import { v4 as uuidv4 } from 'uuid';
import TransactionCriteriaEntity from '../entities/TransactionCriteriaEntity';

const transactions: (TransactionEntity)[]= [
    {
        id: "sampleid1",
        transactionCode : TransactionType.CREDIT,
        amount: 10000,
        accountId: 100,
        createdDate : new Date()
    },
    {
        id: "sampleid2",
        transactionCode : TransactionType.DEBIT,
        amount: 100,
        accountId: 100,
        createdDate : new Date()
    }
];

export default class TransactionRepository {
  public async create (entity: TransactionEntity): Promise<string>{
      entity.id = uuidv4();
      transactions.push(entity);
      return entity.id;
  };

  public getTransactionById(id: string): TransactionEntity{
      return transactions?.find(t=>t.id===id);
  };

  public async getTransactionList(criteria: TransactionCriteriaEntity): Promise<[TransactionEntity[], number]>{
    const data = transactions?.filter(t=>t.accountId===criteria.accountId);
    const result = data.slice((criteria.page - 1) * criteria.limit, criteria.page * criteria.limit);
    const totalData = data?.length;
    return [result, totalData];
};
}
