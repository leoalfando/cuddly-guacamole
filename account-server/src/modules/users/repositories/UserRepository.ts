import UserEntity from '../entities/UserEntity';
import ChildUserEntity from '../entities/ChildUserEntity';
import UserCriteriaEntity from '../entities/UserCriteriaEntity';

const accounts: (UserEntity|ChildUserEntity)[]= [
    new UserEntity({
        id: 1,
        firstName: "Leo",
        lastName: "Alfando",
    }),
    new UserEntity({
        id: 2,
        firstName: "Jeff",
        lastName: "Bezoz",
    }),
    new ChildUserEntity({
        id: 3,
        firstName: "Elon",
        lastName: "Musk",
        guardianId: 1,
    })
];


export default class UserRepository {
    public async getUserList(criteria: UserCriteriaEntity): Promise<[UserEntity[], number]>{
      const result = await accounts.filter(account=>{
          const { firstName, lastName } = account;
          const { keyword } = criteria;
          return (firstName.toLowerCase().includes(keyword.toLowerCase()) || lastName.toLowerCase().includes(keyword.toLowerCase()));
      })
      const totalData = result?.length;
      return [result, totalData];
  };
}
