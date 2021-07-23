import { TransactionType } from './../../commons/Enum';
import { ResponseOutput } from '../../commons/ResponseOutput';
import { assert } from 'chai';
import TransactionService from '../TransactionService';
import * as sinon from 'sinon';
import context from 'jest-plugin-context';
import TransactionRepository from '../repositories/TransactionRepository';
import TransactionEntity from '../entities/TransactionEntity';
import TransactionDto from '../dtos/TransactionDto';
import TransactionCriteriaDto from '../dtos/TransactionCriteriaDto';
import { ErrorStatus } from '../../commons/ErrorStatus';
import TransactionConverter from '../converters/TransactionConverter';


describe('TransactionService', () => {
    let transactionService: TransactionService;
    let transactionRepository: TransactionRepository;
    const sandbox: any = sinon.createSandbox();

    const dto = new TransactionDto();
    dto.amount = 2000000;
    dto.transactionCode = TransactionType.CREDIT;

    const transactionCredit = new TransactionEntity();
    transactionCredit.id = 'exampleid1';
    transactionCredit.amount = 2000000;
    transactionCredit.transactionCode = TransactionType.CREDIT;
    transactionCredit.createdDate = new Date();
    transactionCredit.accountId =  10;

    const transactionDebit = new TransactionEntity();
    transactionDebit.id = 'exampleid1';
    transactionDebit.amount = 100;
    transactionDebit.transactionCode = TransactionType.DEBIT;
    transactionDebit.createdDate = new Date();
    transactionDebit.accountId =  10;

    beforeEach(() => {
        transactionService = new TransactionService();
        transactionRepository = new TransactionRepository();
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
            sinon.assert.calledOnce(repoCreateTransactionStub);
            sinon.assert.notCalled(repoGetTransactionStub);
            sinon.assert.notCalled(convertToDtoStub);
        });

        it('should return error entity is empty', async () => {
            // Arrange
            const newEntity = new TransactionEntity();
            const convertFromDtoStub = sandbox.stub(TransactionConverter.prototype, 'convertFromDto').resolves(newEntity);
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

            // Act
            const result = await transactionService.getTransactionList(null);

        });
    });
});
