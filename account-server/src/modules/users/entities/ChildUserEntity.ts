import IChildUserEntity from '../interfaces/IChildUserEntity';

export default class ChildUserEntity implements IChildUserEntity {
  id!: number;
  firstName!: string;
  lastName!: string;
  guardianId!: number;

  constructor(params?){
    if(params){
      this.id = params.id;
      this.firstName = params.firstName;
      this.lastName = params.lastName;
      this.guardianId = params.guardianId;
    }
  }
}
