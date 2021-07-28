import { TransactionType } from './../../../commons/Enum';
import { assert } from 'chai';
import TransactionConverter from '../../converters/TransactionConverter';
import * as sinon from 'sinon';
import context from 'jest-plugin-context';
import TransactionEntity from '../../entities/TransactionEntity';
import TransactionDto from '../../dtos/TransactionDto';

describe('TransactionConverter', () => {
    let transactionConverter: TransactionConverter;
    const sandbox: any = sinon.createSandbox();


    const transactionCredit = new TransactionEntity();
    transactionCredit.id = 'exampleid1';
    transactionCredit.amount = 2000000;
    transactionCredit.transactionCode = TransactionType.CREDIT;
    transactionCredit.createdDate = new Date();
    transactionCredit.accountId = '10';

    const transactionDebit = new TransactionEntity();
    transactionDebit.id = 'exampleid1';
    transactionDebit.amount = 100;
    transactionDebit.transactionCode = TransactionType.DEBIT;
    transactionDebit.createdDate = new Date();
    transactionDebit.accountId = '10';

    beforeEach(() => {
        transactionConverter = new TransactionConverter();
    });

    afterEach(() => {
        sandbox.restore();
    });
    context('#convertFromDto#', () => {
        it('should return entity with correct attributes', async () => {
            // Arrange
            const dto = new TransactionDto();
            dto.amount = 2000000;
            dto.transactionCode = TransactionType.CREDIT;
            dto.accountId = '100';

            // Act
            const result = await transactionConverter.convertFromDto(dto);

            // Assert
            assert.isNotNull(result, 'result should NOT be null');
            assert.isTrue(result instanceof TransactionEntity);
            assert.deepEqual(result.accountId, dto.accountId);
            assert.deepEqual(result.amount, dto.amount);
            assert.deepEqual(result.transactionCode, dto.transactionCode);
        });

        it('should return null', async () => {
            // Arrange
            const dto = new TransactionDto();

            // Act
            const result = await transactionConverter.convertFromDto(dto);

            // Assert
            assert.isNull(result, 'result should be null');
        });
    });
    context('#convertToDto#', () => {
        it('should return dto with correct attributes', async () => {
            // Arrange
            const entity = new TransactionEntity();
            entity.id = "exampleid100";
            entity.amount = 2000000;
            entity.transactionCode = TransactionType.CREDIT;
            entity.accountId = '100';
            entity.createdDate = new Date();

            // Act
            const result = await transactionConverter.convertToDto(entity);

            // Assert
            assert.isNotNull(result, 'result should NOT be null');
            assert.isTrue(result instanceof TransactionDto);
            assert.deepEqual(result.id, entity.id);
            assert.deepEqual(result.accountId, entity.accountId);
            assert.deepEqual(result.amount, entity.amount);
            assert.deepEqual(result.transactionCode, entity.transactionCode);
            assert.deepEqual(result.createdDate, entity.createdDate);
        });

        it('should return null', async () => {
            // Arrange
            const entity = new TransactionDto();

            // Act
            const result = await transactionConverter.convertToDto(entity);

            // Assert
            assert.isNull(result, 'result should be null');
        });
    });
});
