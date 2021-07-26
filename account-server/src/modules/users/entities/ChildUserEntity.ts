import IChildUserEntity from '../interfaces/IChildUserEntity';

export default class ChildUserEntity implements IChildUserEntity {
  id!: number;
  firstName!: string;
  lastName!: string;

  guardianId!: number;
}
