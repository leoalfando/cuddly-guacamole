import { AccountType, TransactionType } from '../../commons/Enum';
import AccountEntity from '../entities/AccountEntity';
import { v4 as uuidv4 } from 'uuid';

const accounts: (AccountEntity)[]= [
    {
        id: "sampleid1",
        userId: 100,
        type: AccountType.CURRENT,
        createdDate : new Date()
    },
    {
        id: "sampleid2",
        userId: 100,
        type: AccountType.CURRENT,
        createdDate : new Date()
    }
];

export default class AccountRepository {
  public async create (entity: AccountEntity): Promise<string>{
      entity.id = uuidv4();
      accounts.push(entity);
      console.log('accounts', accounts);
      return entity.id;
  };

  public async getAccountById(id: string): Promise<AccountEntity>{
    return accounts?.find(a=>a.id===id);
  };
  public async getAccountByUserId(userId: number): Promise<AccountEntity>{
    return accounts?.find(a=>a.userId===userId);
  };
}
