import IAccountEntity from './IAccountEntity';

export default interface IChildAccountEntity extends IAccountEntity {
  guardianId: number;
}
