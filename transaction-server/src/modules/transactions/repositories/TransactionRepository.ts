import { TransactionOrderBy, TransactionType } from '../../commons/Enum';
import TransactionEntity from '../entities/TransactionEntity';
import { v4 as uuidv4 } from 'uuid';
import TransactionCriteriaEntity from '../entities/TransactionCriteriaEntity';
import * as _ from 'lodash';

const transactions: (TransactionEntity)[]= [
    {
        id: "sampleid1",
        transactionCode : TransactionType.CREDIT,
        amount: 10000,
        accountId: "accountId1",
        createdDate : new Date()
    },
    {
        id: "sampleid2",
        transactionCode : TransactionType.DEBIT,
        amount: 100,
        accountId: "accountId1",
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
    let data = transactions?.filter(t=>t.accountId===criteria.accountId);
    if(!_.isEmpty(data) && criteria.orderBy === TransactionOrderBy.dateDesc){
        data = _.orderBy(data, (o)=>o.createdDate,['desc']);
    }

    const result = data.slice((criteria.page - 1) * criteria.limit, criteria.page * criteria.limit);
    const totalData = data?.length;
    return [result, totalData];
};
}
