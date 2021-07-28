import TransactionDto from "../dtos/TransactionDto";
import TransactionEntity from "../entities/TransactionEntity";
import * as _ from 'lodash';
import TransactionCriteriaDto from "../dtos/TransactionCriteriaDto";
import TransactionCriteriaEntity from "../entities/TransactionCriteriaEntity";
import { TransactionType, TransactionOrderBy } from "../../commons/Enum";
export default class TransactionConverter {
  public convertFromDto (dto: TransactionDto): TransactionEntity {
    if(!_.isEmpty(dto)){
      const result = new TransactionEntity();
      result.amount = dto.amount;
      result.transactionCode = dto.transactionCode;
      result.accountId = dto.accountId;
      return result;
    }
    return null;
  };

  public convertToDto(entity: TransactionEntity): TransactionDto {
    if(!_.isEmpty(entity)){
      const result = new TransactionDto();
      result.id = entity.id;
      result.amount = entity.amount;
      result.transactionCode = entity.transactionCode;
      result.accountId = entity.accountId;
      result.createdDate = entity.createdDate;
      return result;
    }
    return null;
  };

  public convertToCriteriaEntity(criteriaDto: TransactionCriteriaDto): TransactionCriteriaEntity{
    if(!_.isEmpty(criteriaDto)){
      const result = new TransactionCriteriaEntity();
      result.accountId = criteriaDto.accountId;
      result.page = _.toNumber(_.get(criteriaDto, 'page', "0"));
      result.limit = _.toNumber(_.get(criteriaDto, 'limit', "0"));
      if(Object.values(TransactionType).includes(_.toNumber(criteriaDto.transactionCode))){
        result.transactionCode = _.toNumber(criteriaDto.transactionCode);
      }
      if(Object.values(TransactionOrderBy).includes(criteriaDto.orderBy)){
        result.orderBy = criteriaDto.orderBy;
      }
      return result;
    }
    return null;
  }
}
