import TransactionEntity from '../entities/TransactionEntity';

const transactions: (TransactionEntity)[]= [
    {
        id: 1,
        firstName: "Leo",
        lastName: "Alfando",
    },
    {
        id: 2,
        firstName: "Jeff",
        lastName: "Bezoz",
    }
];


export default class TransactionRepository {
  public async getTransactions (keyword: string): Promise<TransactionEntity[]>{
      return transactions.filter(transaction=>{
          const { firstName, lastName } = transaction;
          return (firstName.toLowerCase().includes(keyword.toLowerCase()) || lastName.toLowerCase().includes(keyword.toLowerCase()));
      })
  };

    public async gettransactionById (id: number): Promise<TransactionEntity>{
      return null;
  };
}
