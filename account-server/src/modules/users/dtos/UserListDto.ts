import Pagination from "../../commons/models/Pagination";
import UserDto from "./UserDto";

export default class UserListDto {
  public data!: UserDto[];
  public pagination: Pagination;

    constructor() {
        this.pagination = new Pagination();
    }
}
