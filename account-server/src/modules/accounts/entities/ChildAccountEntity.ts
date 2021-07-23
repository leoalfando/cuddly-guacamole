import IChildAccountEntity from '../interfaces/IChildAccountEntity';

export default class ChildAccountEntity implements IChildAccountEntity {
  id: number;
  firstName: string;
  lastName: string;

  guardianId: number;
}
