// import AccountRepository from './repositories/AccountRepository';
import 'reflect-metadata';
import { ResponseOutput } from '../commons/ResponseOutput';
import { ErrorStatus } from '../commons/ErrorStatus';
import AccountDto from './dtos/AccountDto';

// const userRepository = new AccountRepository();

export default class AccountService {
  public async create(dto: AccountDto): Promise<ResponseOutput> {
    // const entity = await transactionConverter.convertFromDto(dto);
    // const newId = await transactionRepository.create(entity);

    // const newAccount = await transactionRepository.getAccountById(newId);
    // const newDto = transactionConverter.convertToDto(newAccount);
    // return ResponseOutput.createCreatedRequestResponse(newDto);
    return new ResponseOutput();
  }
}
