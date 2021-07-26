import IUserEntity from '../interfaces/IUserEntity';

export default class UserEntity implements IUserEntity {
  id!: number;
  firstName!: string;
  lastName!: string;

  constructor(params?){
    if(params){
      this.id = params.id;
      this.firstName = params.firstName;
      this.lastName = params.lastName;
    }
  }
}
