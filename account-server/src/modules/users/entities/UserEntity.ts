import IUserEntity from '../interfaces/IUserEntity';

export default class UserEntity implements IUserEntity {
  id!: number;
  firstName!: string;
  lastName!: string;
}
