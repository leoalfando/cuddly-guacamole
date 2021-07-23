import { ResponseOutput } from '../../commons/ResponseOutput';
import { assert } from 'chai';
import TransactionService from '../TransactionService';
import * as sinon from 'sinon';
import context from 'jest-plugin-context';
import TransactionRepository from '../repositories/TransactionRepository';
import TransactionEntity from '../entities/TransactionEntity';
import { ErrorStatus } from '../../commons/ErrorStatus';


describe('TransactionService', () => {
    let transactionService: TransactionService;
    let transactionRepository: TransactionRepository;
    const sandbox: any = sinon.createSandbox();

    const transaction1 = new TransactionEntity();
    transaction1.id = 100;
    transaction1.firstName = "Leo";
    transaction1.lastName = "Alfando";

    beforeEach(() => {
        transactionService = new TransactionService();
        transactionRepository = new TransactionRepository();
    });

    afterEach(() => {
        sandbox.restore();
    });
    context('#getTransactions#', () => {
        it('should return 200 and transaction list', async () => {
            const keyword = "leo";

            const repoGettransactionResult = [transaction1,transaction2];
            const repoGettransactionStub = sandbox.stub(TransactionRepository.prototype, 'getTransactions').resolves(repoGettransactionResult);
            const result = await transactionService.getTransactions(keyword);

            assert.isNotNull(result, 'result should NOT be null');
            assert.deepEqual(result.statusCode, 200);
            assert.isNotNull(result.body);
            assert.deepEqual(result.body, repoGettransactionResult);
            sinon.assert.calledOnce(repoGettransactionStub);
        });

        it('should return error and empty body', async () => {
            const keyword = "leo";
            const repoGettransactionResult = [];
            const repoGettransactionStub = sandbox.stub(TransactionRepository.prototype, 'getTransactions').resolves(repoGettransactionResult);
            const result = await transactionService.getTransactions(keyword);

            assert.isNotNull(result, 'result should NOT be null');
            assert.deepEqual(result.statusCode, 404);
            assert.isUndefined(result.body);
            sinon.assert.calledOnce(repoGettransactionStub);
        });

        it('should return error if keyword is less than 3 letter', async () => {
            const keyword = "le";
            const repoGettransactionStub = sandbox.stub(TransactionRepository.prototype, 'getTransactions');
            const result = await transactionService.getTransactions(keyword);
            const expectedResult = ResponseOutput.createBadRequestResponse(ErrorStatus.ACCOUNT_GET_LIST_MIN_KEYWORD);
            assert.isNotNull(result, 'result should NOT be null');
            assert.deepEqual(result, expectedResult);
            sinon.assert.notCalled(repoGettransactionStub);
        });

    });
});
