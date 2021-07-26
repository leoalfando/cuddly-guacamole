import IUserEntity from './IUserEntity';

export default interface IChildUserEntity extends IUserEntity {
  guardianId: number;
}
