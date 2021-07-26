import { AccountType } from './../../commons/Enum';
export default interface AccountEntity {
  id: string;
  type: AccountType;
  createdDate: Date;
  userId: number;
}
