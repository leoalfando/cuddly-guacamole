import UserEntity from '../entities/UserEntity';
import ChildUserEntity from '../entities/ChildUserEntity';

const accounts: (UserEntity|ChildUserEntity)[]= [
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


export default class UserRepository {
    public async getUsers (keyword: string): Promise<UserEntity[]>{
      return accounts.filter(account=>{
          const { firstName, lastName } = account;
          return (firstName.toLowerCase().includes(keyword.toLowerCase()) || lastName.toLowerCase().includes(keyword.toLowerCase()));
      })
  };
}
