import { TransactionType } from './../../commons/Enum';
import { ResponseOutput } from '../../commons/ResponseOutput';
import { assert } from 'chai';
import TransactionService from '../TransactionService';
import * as sinon from 'sinon';
import context from 'jest-plugin-context';
import TransactionRepository from '../repositories/TransactionRepository';
import TransactionEntity from '../entities/TransactionEntity';
import TransactionDto from '../dtos/TransactionDto';
import { ErrorStatus } from '../../commons/ErrorStatus';


describe('TransactionService', () => {
    let transactionService: TransactionService;
    let transactionRepository: TransactionRepository;
    const sandbox: any = sinon.createSandbox();

    const dto = new TransactionDto();
    dto.amount = 2000000;
    dto.transactionCode = TransactionType.CREDIT;

    const transaction1 = new TransactionEntity();
    transaction1.id = 100;
    transaction1.amount = 2000000;
    transaction1.transactionCode = TransactionType.CREDIT;
    transaction1.createdDate = new Date();
    transaction1.createdBy =  10;

    const transaction2 = new TransactionEntity();
    transaction1.id = 100;
    transaction1.amount = 100;
    transaction1.transactionCode = TransactionType.DEBIT;
    transaction1.createdDate = new Date();
    transaction1.createdBy =  10;

    beforeEach(() => {
        transactionService = new TransactionService();
        transactionRepository = new TransactionRepository();
    });

    afterEach(() => {
        sandbox.restore();
    });
    context('#getTransactions#', () => {
        it('should return 200 and transaction list', async () => {

            const result = await transactionService.create(dto);

            assert.isNotNull(result, 'result should NOT be null');
            assert.deepEqual(result.statusCode, 200);
            assert.isNotNull(result.body);
        });
    });
});
