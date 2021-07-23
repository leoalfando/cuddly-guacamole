import IAccountEntity from '../interfaces/IAccountEntity';

export default class AccountEntity implements IAccountEntity {
  id!: number;
  firstName: string;
  lastName: string;
}
