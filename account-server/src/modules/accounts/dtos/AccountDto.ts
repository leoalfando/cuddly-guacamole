import { AccountType } from '../../commons/Enum';

export default class AccountDto{
  id!: string;
  type!: AccountType;
  createdDate!: Date;
  userId!: number;

  amount!:number;
}
