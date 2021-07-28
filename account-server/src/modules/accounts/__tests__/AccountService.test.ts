import { AccountType} from './../../commons/Enum';
import { ResponseOutput } from '../../commons/ResponseOutput';
import { assert } from 'chai';
import AccountService from '../AccountService';
import * as sinon from 'sinon';
import context from 'jest-plugin-context';
import AccountRepository from '../repositories/AccountRepository';
import AccountEntity from '../entities/AccountEntity';
import AccountDto from '../dtos/AccountDto';
import { ErrorStatus } from '../../commons/ErrorStatus';
import AccountConverter from '../converters/AccountConverter';
import AccountDomain from '../domains/AccountDomain';
import UserService from '../../users/UserService';
import TransactionRepository from '../../users/repositories/TransactionRepository';


describe('AccountService', () => {
  let accountService: AccountService;
  const sandbox: any = sinon.createSandbox();
  const dto = new AccountDto();
  dto.userId = 1;
  dto.type = AccountType.CURRENT;

  beforeEach(() => {
      accountService = new AccountService();
  });

  afterEach(() => {
      sandbox.restore();
  });
  context('#create#', () => {
    it('should return 201 and newly created account', async () => {
        // Arrange
        const accountDto = new AccountDto();
        accountDto.userId = 1;
        accountDto.type = AccountType.CURRENT;
        accountDto.amount = 100;

        const entity = new AccountEntity();
        entity.type = AccountType.CURRENT;
        entity.userId = 1;
        const newId = "randomId12345";
        const resultEntity = Object.assign({}, entity);
        resultEntity.id = newId;

        const getUserResult = ResponseOutput.createOkResponse({});
        const convertFromDtoStub = sandbox.stub(AccountConverter.prototype, 'convertFromDto').resolves(entity);
        const validateCreateStub = sandbox.stub(AccountDomain.prototype, 'validateCreate').resolves([]);
        const processCreateStub = sandbox.stub(AccountDomain.prototype, 'processCreate');
        const getUserStub = sandbox.stub(UserService.prototype, 'getUserById').resolves(getUserResult);
        const repoCreateAccountStub = sandbox.stub(AccountRepository.prototype, 'create').resolves(newId);
        const repoGetAccountStub = sandbox.stub(AccountRepository.prototype, 'getAccountById').resolves(resultEntity);
        const convertToDtoStub = sandbox.stub(AccountConverter.prototype, 'convertToDto').resolves(entity);
        const createTransactionStub = sandbox.stub(TransactionRepository.prototype, 'createTransaction').resolves(null);

        // Act
        const result = await accountService.create(accountDto);

        // Assert
        assert.isNotNull(result, 'result should NOT be null');
        assert.deepEqual(result.statusCode, 201);
        assert.isNotNull(result.body);
        sinon.assert.calledOnce(convertFromDtoStub);
        sinon.assert.calledOnce(validateCreateStub);
        sinon.assert.calledOnce(processCreateStub);
        sinon.assert.calledOnce(getUserStub);
        sinon.assert.calledOnce(repoCreateAccountStub);
        sinon.assert.calledOnce(repoGetAccountStub);
        sinon.assert.calledOnce(convertToDtoStub);
        sinon.assert.calledOnce(createTransactionStub);
    });
    it('should return 201 without calling transaction create', async () => {
        // Arrange
        const accountDto = new AccountDto();
        accountDto.userId = 1;
        accountDto.type = AccountType.CURRENT;
        accountDto.amount = 0;

        const entity = new AccountEntity();
        entity.type = AccountType.CURRENT;
        entity.userId = 1;
        const newId = "randomId12345";
        const resultEntity = Object.assign({}, entity);
        resultEntity.id = newId;

        const getUserResult = ResponseOutput.createOkResponse({});
        const convertFromDtoStub = sandbox.stub(AccountConverter.prototype, 'convertFromDto').resolves(entity);
        const validateCreateStub = sandbox.stub(AccountDomain.prototype, 'validateCreate').resolves([]);
        const processCreateStub = sandbox.stub(AccountDomain.prototype, 'processCreate');
        const getUserStub = sandbox.stub(UserService.prototype, 'getUserById').resolves(getUserResult);
        const repoCreateAccountStub = sandbox.stub(AccountRepository.prototype, 'create').resolves(newId);
        const repoGetAccountStub = sandbox.stub(AccountRepository.prototype, 'getAccountById').resolves(resultEntity);
        const convertToDtoStub = sandbox.stub(AccountConverter.prototype, 'convertToDto').resolves(entity);
        const createTransactionStub = sandbox.stub(TransactionRepository.prototype, 'createTransaction').resolves(null);

        // Act
        const result = await accountService.create(accountDto);

        // Assert
        assert.isNotNull(result, 'result should NOT be null');
        assert.deepEqual(result.statusCode, 201);
        assert.isNotNull(result.body);
        sinon.assert.calledOnce(convertFromDtoStub);
        sinon.assert.calledOnce(validateCreateStub);
        sinon.assert.calledOnce(processCreateStub);
        sinon.assert.calledOnce(getUserStub);
        sinon.assert.calledOnce(repoCreateAccountStub);
        sinon.assert.calledOnce(repoGetAccountStub);
        sinon.assert.calledOnce(convertToDtoStub);
        sinon.assert.notCalled(createTransactionStub);
    });

    it('should return error if entity is empty', async () => {
      // Arrange
      const entity = new AccountEntity();
      const convertFromDtoStub = sandbox.stub(AccountConverter.prototype, 'convertFromDto').resolves(entity);
      const validateCreateStub = sandbox.stub(AccountDomain.prototype, 'validateCreate')
      const processCreateStub = sandbox.stub(AccountDomain.prototype, 'processCreate');
      const getUserStub = sandbox.stub(UserService.prototype, 'getUserById');
      const repoCreateAccountStub = sandbox.stub(AccountRepository.prototype, 'create');
      const repoGetAccountStub = sandbox.stub(AccountRepository.prototype, 'getAccountById');
      const convertToDtoStub = sandbox.stub(AccountConverter.prototype, 'convertToDto');
      const createTransactionStub = sandbox.stub(TransactionRepository.prototype, 'createTransaction').resolves(null);

      const expectedResult = ResponseOutput.createBadRequestResponse(ErrorStatus.ACCOUNT_CREATE_REQ_NOT_FOUND);

      // Act
      const result = await accountService.create(dto);

      // Assert
      assert.isNotNull(result, 'result should NOT be null');
      assert.deepEqual(result, expectedResult);
      assert.isNotNull(result.body);
      sinon.assert.calledOnce(convertFromDtoStub);
      sinon.assert.notCalled(validateCreateStub);
      sinon.assert.notCalled(processCreateStub);
      sinon.assert.notCalled(getUserStub);
      sinon.assert.notCalled(repoCreateAccountStub);
      sinon.assert.notCalled(repoGetAccountStub);
      sinon.assert.notCalled(convertToDtoStub);
      sinon.assert.notCalled(createTransactionStub);
    });
    it('should return error if domain validation failed', async () => {
      // Arrange
      const entity = new AccountEntity();
      entity.type = AccountType.CURRENT;
      entity.userId = 1;
      const domainValidateResult = [ErrorStatus.ACCOUNT_CREATE_USER_ID_MANDATORY];
      const convertFromDtoStub = sandbox.stub(AccountConverter.prototype, 'convertFromDto').resolves(entity);
      const validateCreateStub = sandbox.stub(AccountDomain.prototype, 'validateCreate').resolves(domainValidateResult);
      const processCreateStub = sandbox.stub(AccountDomain.prototype, 'processCreate');
      const getUserStub = sandbox.stub(UserService.prototype, 'getUserById');
      const repoCreateAccountStub = sandbox.stub(AccountRepository.prototype, 'create');
      const repoGetAccountStub = sandbox.stub(AccountRepository.prototype, 'getAccountById');
      const convertToDtoStub = sandbox.stub(AccountConverter.prototype, 'convertToDto');
      const createTransactionStub = sandbox.stub(TransactionRepository.prototype, 'createTransaction').resolves(null);

      const expectedResult = ResponseOutput.createBadRequestResponse(ErrorStatus.ACCOUNT_CREATE_USER_ID_MANDATORY);

      // Act
      const result = await accountService.create(dto);

      // Assert
      assert.isNotNull(result, 'result should NOT be null');
      assert.deepEqual(result, expectedResult);
      assert.isNotNull(result.body);
      sinon.assert.calledOnce(convertFromDtoStub);
      sinon.assert.calledOnce(validateCreateStub);
      sinon.assert.notCalled(processCreateStub);
      sinon.assert.notCalled(getUserStub);
      sinon.assert.notCalled(repoCreateAccountStub);
      sinon.assert.notCalled(repoGetAccountStub);
      sinon.assert.notCalled(convertToDtoStub);
      sinon.assert.notCalled(createTransactionStub);
    });
    it('should return error if user doesnt exist', async () => {
      // Arrange
      const entity = new AccountEntity();
      entity.type = AccountType.CURRENT;
      entity.userId = 1;
      const getUserResult = ResponseOutput.createNotFoundRequestResponse();
      const convertFromDtoStub = sandbox.stub(AccountConverter.prototype, 'convertFromDto').resolves(entity);
      const validateCreateStub = sandbox.stub(AccountDomain.prototype, 'validateCreate').resolves([]);
      const processCreateStub = sandbox.stub(AccountDomain.prototype, 'processCreate');
      const getUserStub = sandbox.stub(UserService.prototype, 'getUserById').resolves(getUserResult);
      const repoCreateAccountStub = sandbox.stub(AccountRepository.prototype, 'create');
      const repoGetAccountStub = sandbox.stub(AccountRepository.prototype, 'getAccountById');
      const convertToDtoStub = sandbox.stub(AccountConverter.prototype, 'convertToDto');
      const createTransactionStub = sandbox.stub(TransactionRepository.prototype, 'createTransaction').resolves(null);

      const expectedResult = ResponseOutput.createBadRequestResponse(ErrorStatus.ACCOUNT_CREATE_USER_NOT_EXIST);

      // Act
      const result = await accountService.create(dto);

      // Assert
      assert.isNotNull(result, 'result should NOT be null');
      assert.deepEqual(result, expectedResult);
      assert.isNotNull(result.body);
      sinon.assert.calledOnce(convertFromDtoStub);
      sinon.assert.calledOnce(validateCreateStub);
      sinon.assert.calledOnce(processCreateStub);
      sinon.assert.calledOnce(getUserStub);
      sinon.assert.notCalled(repoCreateAccountStub);
      sinon.assert.notCalled(repoGetAccountStub);
      sinon.assert.notCalled(convertToDtoStub);
      sinon.assert.notCalled(createTransactionStub);
    });
    it('should return error create failed', async () => {
      // Arrange
      const entity = new AccountEntity();
      entity.type = AccountType.CURRENT;
      entity.userId = 1;
      const getUserResult = ResponseOutput.createOkResponse({});
      const convertFromDtoStub = sandbox.stub(AccountConverter.prototype, 'convertFromDto').resolves(entity);
      const validateCreateStub = sandbox.stub(AccountDomain.prototype, 'validateCreate').resolves([]);
      const processCreateStub = sandbox.stub(AccountDomain.prototype, 'processCreate');
      const getUserStub = sandbox.stub(UserService.prototype, 'getUserById').resolves(getUserResult);
      const repoCreateAccountStub = sandbox.stub(AccountRepository.prototype, 'create').resolves(false);
      const repoGetAccountStub = sandbox.stub(AccountRepository.prototype, 'getAccountById');
      const convertToDtoStub = sandbox.stub(AccountConverter.prototype, 'convertToDto');
      const createTransactionStub = sandbox.stub(TransactionRepository.prototype, 'createTransaction').resolves(null);

      const expectedResult = ResponseOutput.createInternalServerErrorRequestResponse(ErrorStatus.ACCOUNT_CREATE_FAILED);

      // Act
      const result = await accountService.create(dto);

      // Assert
      assert.isNotNull(result, 'result should NOT be null');
      assert.deepEqual(result, expectedResult);
      assert.isNotNull(result.body);
      sinon.assert.calledOnce(convertFromDtoStub);
      sinon.assert.calledOnce(validateCreateStub);
      sinon.assert.calledOnce(processCreateStub);
      sinon.assert.calledOnce(getUserStub);
      sinon.assert.calledOnce(repoCreateAccountStub);
      sinon.assert.notCalled(repoGetAccountStub);
      sinon.assert.notCalled(convertToDtoStub);
      sinon.assert.notCalled(createTransactionStub);
    });
  });
});
