import Pagination from "../../commons/models/Pagination";
import TransactionDto from "./TransactionDto";

export default class TransactionListDto {
    public data: TransactionDto[];
  public pagination: Pagination;

    constructor() {
        this.pagination = new Pagination();
    }
}
