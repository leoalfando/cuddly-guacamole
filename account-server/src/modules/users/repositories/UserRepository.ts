import UserEntity from '../entities/UserEntity';
import ChildUserEntity from '../entities/ChildUserEntity';
import UserCriteriaEntity from '../entities/UserCriteriaEntity';
import * as _ from 'lodash';
const users: (UserEntity|ChildUserEntity)[]= [
    new UserEntity({
        id: 1,
        firstName: "Leo",
        lastName: "Alfando",
    }),
    new UserEntity({
        id: 2,
        firstName: "Rando",
        lastName: "Nam",
    }),
    new ChildUserEntity({
        id: 3,
        firstName: "Auto",
        lastName: "Mobile",
        guardianId: 1,
    }),
    new UserEntity({
        id: 4,
        firstName: "Frans",
        lastName: "Tormer",
    }),
    new UserEntity({
        id: 5,
        firstName: "Terry",
        lastName: "Jom",
    }),
    new UserEntity({
        id: 6,
        firstName: "Gan",
        lastName: "Dalf",
    }),
];


export default class UserRepository {
  public async getUserList(criteria: UserCriteriaEntity): Promise<[UserEntity[], number]>{
      const data = await users.filter(account=>{
          const { firstName, lastName } = account;
          const { keyword } = criteria;
          return (_.isNil(keyword) || firstName.toLowerCase().includes(keyword.toLowerCase()) || lastName.toLowerCase().includes(keyword.toLowerCase()));
      })
      const totalData = data?.length;
      const result = data.slice((criteria.page - 1) * criteria.limit, criteria.page * criteria.limit);
      return [result, totalData];
  };

  public getUserById(id: number): UserEntity{
    return users?.find(t=>t.id===id);
  };
}
