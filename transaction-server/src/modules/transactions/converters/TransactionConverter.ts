import TransactionDto from "../dtos/TransactionDto";
import TransactionEntity from "../entities/TransactionEntity";

export default class TransactionConverter {
  public convertFromDto (dto: TransactionDto): TransactionEntity {
    const result = new TransactionEntity();
    result.amount = dto.amount;
    result.transactionCode = dto.transactionCode;
    result.accountId = dto.accountId;
    return result;
  };

  public convertToDto (entity: TransactionEntity): TransactionDto {
    const result = new TransactionDto();
    result.id = entity.id;
    result.amount = entity.amount;
    result.transactionCode = entity.transactionCode;
    result.accountId = entity.accountId;
    result.createdDate = entity.createdDate;
    return result;
  };
}
