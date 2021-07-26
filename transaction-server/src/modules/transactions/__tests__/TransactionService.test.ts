import { TransactionType } from './../../commons/Enum';
import { ResponseOutput } from '../../commons/ResponseOutput';
import { assert } from 'chai';
import TransactionService from '../TransactionService';
import TransactionDomain from '../domains/TransactionDomain';
import * as sinon from 'sinon';
import context from 'jest-plugin-context';
import TransactionRepository from '../repositories/TransactionRepository';
import TransactionEntity from '../entities/TransactionEntity';
import TransactionDto from '../dtos/TransactionDto';
import TransactionListDto from '../dtos/TransactionListDto';
import TransactionCriteriaDto from '../dtos/TransactionCriteriaDto';
import { ErrorStatus } from '../../commons/ErrorStatus';
import TransactionConverter from '../converters/TransactionConverter';
import Pagination from '../../commons/models/Pagination';
import TransactionCriteriaEntity from '../entities/TransactionCriteriaEntity';


describe('TransactionService', () => {
    let transactionService: TransactionService;
    const sandbox: any = sinon.createSandbox();
    const newDate = new Date();
    const dto = new TransactionDto();
    dto.amount = 2000000;
    dto.transactionCode = TransactionType.CREDIT;

    const transactionCredit = new TransactionEntity();
    transactionCredit.id = 'exampleid1';
    transactionCredit.amount = 2000000;
    transactionCredit.transactionCode = TransactionType.CREDIT;
    transactionCredit.createdDate = newDate;
    transactionCredit.accountId =  10;

    const transactionDebit = new TransactionEntity();
    transactionDebit.id = 'exampleid1';
    transactionDebit.amount = 100;
    transactionDebit.transactionCode = TransactionType.DEBIT;
    transactionDebit.createdDate = newDate;
    transactionDebit.accountId =  10;

    const transactionCreditDto = new TransactionDto();
    transactionCreditDto.id = 'exampleid1';
    transactionCreditDto.amount = 2000000;
    transactionCreditDto.transactionCode = TransactionType.CREDIT;
    transactionCreditDto.createdDate = newDate;
    transactionCreditDto.accountId = 10;

    const transactionDebitDto = new TransactionDto();
    transactionDebitDto.id = 'exampleid1';
    transactionDebitDto.amount = 100;
    transactionDebitDto.transactionCode = TransactionType.DEBIT;
    transactionDebitDto.createdDate = newDate;
    transactionDebitDto.accountId = 10;

    beforeEach(() => {
        transactionService = new TransactionService();
    });

    afterEach(() => {
        sandbox.restore();
    });
    context('#create#', () => {
        it('should return 201 and newly created transaction', async () => {
            // Arrange
            const entity = new TransactionEntity();
            entity.amount = 500;
            entity.transactionCode = TransactionType.CREDIT;
            entity.accountId = 100;
            const newId = "randomId12345";
            const resultEntity = Object.assign({}, entity);
            resultEntity.id = newId;
            const convertFromDtoStub = sandbox.stub(TransactionConverter.prototype, 'convertFromDto').resolves(entity);
            const validateCreateStub = sandbox.stub(TransactionDomain.prototype, 'validateCreate').resolves([]);
            const processCreateStub = sandbox.stub(TransactionDomain.prototype, 'processCreate');
            const repoCreateTransactionStub = sandbox.stub(TransactionRepository.prototype, 'create').resolves(newId);
            const repoGetTransactionStub = sandbox.stub(TransactionRepository.prototype, 'getTransactionById').resolves(resultEntity);
            const convertToDtoStub = sandbox.stub(TransactionConverter.prototype, 'convertToDto').resolves(entity);

            // Act
            const result = await transactionService.create(dto);

            // Assert
            assert.isNotNull(result, 'result should NOT be null');
            assert.deepEqual(result.statusCode, 201);
            assert.isNotNull(result.body);
            sinon.assert.calledOnce(convertFromDtoStub);
            sinon.assert.calledOnce(validateCreateStub);
            sinon.assert.calledOnce(processCreateStub);
            sinon.assert.calledOnce(repoCreateTransactionStub);
            sinon.assert.calledOnce(repoGetTransactionStub);
            sinon.assert.calledOnce(convertToDtoStub);
        });

        it('should return error if creation failed', async () => {
            // Arrange
            const entity = new TransactionEntity();
            entity.amount = 500;
            entity.transactionCode = TransactionType.CREDIT;
            entity.accountId = 100;
            const convertFromDtoStub = sandbox.stub(TransactionConverter.prototype, 'convertFromDto').resolves(entity);
            const validateCreateStub = sandbox.stub(TransactionDomain.prototype, 'validateCreate').resolves([]);
            const processCreateStub = sandbox.stub(TransactionDomain.prototype, 'processCreate');
            const repoCreateTransactionStub = sandbox.stub(TransactionRepository.prototype, 'create').resolves(null);
            const repoGetTransactionStub = sandbox.stub(TransactionRepository.prototype, 'getTransactionById');
            const convertToDtoStub = sandbox.stub(TransactionConverter.prototype, 'convertToDto');
            const expectedResult = ResponseOutput.createInternalServerErrorRequestResponse(ErrorStatus.TRANSACTION_CREATE_FAILED);

            // Act
            const result = await transactionService.create(dto);

            // Assert
            assert.isNotNull(result, 'result should NOT be null');
            assert.isNotNull(result.body);
            assert.deepEqual(result, expectedResult);
            sinon.assert.calledOnce(convertFromDtoStub);
            sinon.assert.calledOnce(validateCreateStub);
            sinon.assert.calledOnce(processCreateStub);
            sinon.assert.calledOnce(repoCreateTransactionStub);
            sinon.assert.notCalled(repoGetTransactionStub);
            sinon.assert.notCalled(convertToDtoStub);
        });

        it('should return error if entity is empty', async () => {
            // Arrange
            const newEntity = new TransactionEntity();
            const convertFromDtoStub = sandbox.stub(TransactionConverter.prototype, 'convertFromDto').resolves(newEntity);
            const validateCreateStub = sandbox.stub(TransactionDomain.prototype, 'validateCreate');
            const processCreateStub = sandbox.stub(TransactionDomain.prototype, 'processCreate');
            const repoCreateTransactionStub = sandbox.stub(TransactionRepository.prototype, 'create');
            const repoGetTransactionStub = sandbox.stub(TransactionRepository.prototype, 'getTransactionById');
            const convertToDtoStub = sandbox.stub(TransactionConverter.prototype, 'convertToDto');
            const expectedResult = ResponseOutput.createBadRequestResponse(ErrorStatus.TRANSACTION_CREATE_REQ_NOT_FOUND);

            // Act
            const result = await transactionService.create(null);

            // Assert
            assert.isNotNull(result, 'result should NOT be null');
            assert.isNotNull(result.body);
            assert.deepEqual(result, expectedResult);
            sinon.assert.calledOnce(convertFromDtoStub);
            sinon.assert.notCalled(validateCreateStub);
            sinon.assert.notCalled(processCreateStub);
            sinon.assert.notCalled(repoCreateTransactionStub);
            sinon.assert.notCalled(repoGetTransactionStub);
            sinon.assert.notCalled(convertToDtoStub);
        });

        it('should return error if validation failed', async () => {
            // Arrange
            const entity = new TransactionEntity();
            entity.amount = 0;
            entity.transactionCode = 3;
            entity.accountId = null;
            const convertFromDtoStub = sandbox.stub(TransactionConverter.prototype, 'convertFromDto').resolves(entity);
            const expectedErrors = [
                ErrorStatus.TRANSACTION_CREATE_ACCOUNT_ID_MANDATORY,
                ErrorStatus.TRANSACTION_CREATE_AMOUNT_MANDATORY,
                ErrorStatus.TRANSACTION_CREATE_TYPE_INVALID
            ]
            const validateCreateStub = sandbox.stub(TransactionDomain.prototype, 'validateCreate').resolves(expectedErrors);
            const processCreateStub = sandbox.stub(TransactionDomain.prototype, 'processCreate');
            const repoCreateTransactionStub = sandbox.stub(TransactionRepository.prototype, 'create').resolves(null);
            const repoGetTransactionStub = sandbox.stub(TransactionRepository.prototype, 'getTransactionById');
            const convertToDtoStub = sandbox.stub(TransactionConverter.prototype, 'convertToDto');

            const expectedResult = ResponseOutput.createBadRequestResponse(expectedErrors);

            // Act
            const result = await transactionService.create(dto);

            // Assert
            assert.isNotNull(result, 'result should NOT be null');
            assert.isNotNull(result.body);
            assert.deepEqual(result, expectedResult);
            sinon.assert.calledOnce(convertFromDtoStub);
            sinon.assert.calledOnce(validateCreateStub);
            sinon.assert.notCalled(processCreateStub);
            sinon.assert.notCalled(repoCreateTransactionStub);
            sinon.assert.notCalled(repoGetTransactionStub);
            sinon.assert.notCalled(convertToDtoStub);
        });
    });

    context('#getTransactionList#', () => {
        it('should return 200 and list of transactions', async () => {
            // Arrange
            const criteriaDto = new TransactionCriteriaDto();
            criteriaDto.accountId = '100';
            criteriaDto.page = '1';
            criteriaDto.limit = '5';
            const criteriaEntity = new TransactionCriteriaEntity();
            criteriaEntity.accountId = 100;
            criteriaEntity.page = 1;
            criteriaEntity.limit = 5;

            const transactionListDto = new TransactionListDto();
            transactionListDto.data = [transactionCreditDto, transactionDebitDto];
            const pagination = new Pagination();
            pagination.page = 1;
            pagination.total = 2;
            pagination.limit = 5;
            transactionListDto.pagination = pagination;
            const expectedResult = ResponseOutput.createOkResponse(transactionListDto);
            const convertToCriteriaEntityStub = sandbox.stub(TransactionConverter.prototype, 'convertToCriteriaEntity').resolves(criteriaEntity);
            const validateCriteriaStub = sandbox.stub(TransactionDomain.prototype, 'validateCriteria').resolves([])
            const repoGetTransactionListStub = sandbox.stub(TransactionRepository.prototype, 'getTransactionList').resolves([[transactionCredit, transactionDebit],2]);
            const convertToDtoStub = sandbox.stub(TransactionConverter.prototype, 'convertToDto');
            convertToDtoStub.onCall(0).resolves(transactionCreditDto);
            convertToDtoStub.onCall(1).resolves(transactionDebitDto);

            // Act
            const result = await transactionService.getTransactionList(criteriaDto);

            // Assert
            assert.isNotNull(result, 'result should NOT be null');
            assert.isNotNull(result.body);
            assert.deepEqual(result, expectedResult);
            sinon.assert.calledOnce(convertToCriteriaEntityStub);
            sinon.assert.calledOnce(validateCriteriaStub);
            sinon.assert.calledOnce(repoGetTransactionListStub);
            sinon.assert.calledTwice(convertToDtoStub);
        });

        it('should return 200 and empty data is transaction not found', async () => {
            // Arrange
            const criteriaDto = new TransactionCriteriaDto();
            criteriaDto.accountId = '100';
            criteriaDto.page = '1';
            criteriaDto.limit = '5';
            const criteriaEntity = new TransactionCriteriaEntity();
            criteriaEntity.accountId = 100;
            criteriaEntity.page = 1;
            criteriaEntity.limit = 5;

            const transactionListDto = new TransactionListDto();
            transactionListDto.data = [transactionCreditDto, transactionDebitDto];
            const pagination = new Pagination();
            pagination.page = 1;
            pagination.total = 0;
            pagination.limit = 5;
            transactionListDto.pagination = pagination;
            const expectedResult = ResponseOutput.createOkResponse(new TransactionListDto());
            const convertToCriteriaEntityStub = sandbox.stub(TransactionConverter.prototype, 'convertToCriteriaEntity').resolves(criteriaEntity);
            const validateCriteriaStub = sandbox.stub(TransactionDomain.prototype, 'validateCriteria').resolves([])
            const repoGetTransactionListStub = sandbox.stub(TransactionRepository.prototype, 'getTransactionList').resolves([[],0]);
            const convertToDtoStub = sandbox.stub(TransactionConverter.prototype, 'convertToDto');

            // Act
            const result = await transactionService.getTransactionList(criteriaDto);

            // Assert
            assert.isNotNull(result, 'result should NOT be null');
            assert.isNotNull(result.body);
            assert.deepEqual(result, expectedResult);
            sinon.assert.calledOnce(convertToCriteriaEntityStub);
            sinon.assert.calledOnce(validateCriteriaStub);
            sinon.assert.calledOnce(repoGetTransactionListStub);
            sinon.assert.notCalled(convertToDtoStub);
        });

        it('should return 400 and errors if domain return error', async () => {
            // Arrange
            const criteriaDto = new TransactionCriteriaDto();
            criteriaDto.accountId = '100';
            criteriaDto.page = '1';
            criteriaDto.limit = '5';
            const criteriaEntity = new TransactionCriteriaEntity();
            criteriaEntity.accountId = 100;
            criteriaEntity.page = 1;
            criteriaEntity.limit = 5;

            const expectedError = [ErrorStatus.TRANSACTION_GET_LIST_ACCOUNT_ID_MANDATORY]
            const expectedResult = ResponseOutput.createBadRequestResponse(expectedError);

            const convertToCriteriaEntityStub = sandbox.stub(TransactionConverter.prototype, 'convertToCriteriaEntity');
            const validateCriteriaStub = sandbox.stub(TransactionDomain.prototype, 'validateCriteria').resolves(expectedError)
            const repoGetTransactionListStub = sandbox.stub(TransactionRepository.prototype, 'getTransactionList');
            const convertToDtoStub = sandbox.stub(TransactionConverter.prototype, 'convertToDto');

            // Act
            const result = await transactionService.getTransactionList(criteriaDto);

            // Assert
            assert.isNotNull(result, 'result should NOT be null');
            assert.isNotNull(result.body);
            assert.deepEqual(result, expectedResult);
            sinon.assert.calledOnce(convertToCriteriaEntityStub);
            sinon.assert.calledOnce(validateCriteriaStub);
            sinon.assert.notCalled(repoGetTransactionListStub);
            sinon.assert.notCalled(convertToDtoStub);
        });
    });
});
