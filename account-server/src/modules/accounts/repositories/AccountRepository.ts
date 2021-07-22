import AccountEntity from '../entities/AccountEntity';
import ChildAccountEntity from '../entities/ChildAccountEntity';

const accounts: (AccountEntity|ChildAccountEntity)[]= [
    {
        id: 1,
        firstName: "Leo",
        lastName: "Alfando",
    },
    {
        id: 2,
        firstName: "Jeff",
        lastName: "Bezoz",
    },
    {
        id: 3,
        firstName: "Elon",
        lastName: "Musk",
        guardianId: 1,
    }
];


export default class AccountRepository {
  public async getAccounts (keyword: string): Promise<AccountEntity[]>{
      return accounts.filter(account=>{
          const { firstName, lastName } = account;
          return (firstName.toLowerCase().includes(keyword.toLowerCase()) || lastName.toLowerCase().includes(keyword.toLowerCase()));
      })
      // const accountRepository = getManager().getRepository(AccountEntity);
      // const result: Promise<AccountEntity[]> = accountRepository.find();
      // return result;
  };

    public async getAccountById (id: number): Promise<AccountEntity>{
      // const accountRepository = getManager().getRepository(AccountEntity);
      // const result: Promise<AccountEntity[]> = accountRepository.find();
      // return result;
      return null;
  };
}
