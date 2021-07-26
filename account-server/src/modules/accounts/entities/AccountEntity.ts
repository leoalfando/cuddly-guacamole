import { AccountType } from '../../commons/Enum';
import IAccountEntity from '../interfaces/IAccountEntity';

export default class AccountEntity implements IAccountEntity {
  id!: string;
  type!: AccountType;
  createdDate!: Date;
  userId!: number;
}
