import { assert } from 'chai';
import * as sinon from 'sinon';
import context from 'jest-plugin-context';
import TransactionDomain from '../../domains/TransactionDomain';
import TransactionCriteriaEntity from '../../entities/TransactionCriteriaEntity';
import { TransactionType } from '../../../commons/Enum';
import { ErrorStatus } from '../../../commons/ErrorStatus';
import TransactionEntity from '../../entities/TransactionEntity';


describe('TransactionDomain', () => {
    let transactionDomain: TransactionDomain;
    const sandbox: any = sinon.createSandbox();
    beforeEach(() => {
        transactionDomain = new TransactionDomain();
    });

    afterEach(() => {
        sandbox.restore();
    });
    context('#validateCriteria#', () => {
        it('should return empty if all validation passed', async () => {
          // Arrange
          const criteria = new TransactionCriteriaEntity();
          criteria.accountId = 100;
          criteria.transactionCode = TransactionType.CREDIT;

          // Act
          const result = await transactionDomain.validateCriteria(criteria);

          // Assert
          assert.isEmpty(result);
        });

        it('should return errors if validation failed', async () => {
          // Arrange
          const criteria = new TransactionCriteriaEntity();
          criteria.accountId = null;
          criteria.transactionCode = 1000;
          const expectedError = [
            ErrorStatus.TRANSACTION_GET_LIST_ACCOUNT_ID_MANDATORY,
            ErrorStatus.TRANSACTION_GET_LIST_TYPE_INVALID
          ]
          // Act
          const result = await transactionDomain.validateCriteria(criteria);

          // Assert
          assert.isNotEmpty(result);
          assert.deepEqual(result, expectedError,  'Error mismatched');
        });
    });

    context('#validateCreate#', () => {
      it('should return empty if all validation passed', async () => {
        // Arrange
        const entity = new TransactionEntity();
        entity.accountId = 100;
        entity.transactionCode = TransactionType.CREDIT;
        entity.amount = 10000;

        // Act
        const result = await transactionDomain.validateCreate(entity);

        // Assert
        assert.isEmpty(result);
      });

      it('should return errors if validation failed', async () => {
        // Arrange
        const entity = new TransactionEntity();
        entity.accountId = null;
        entity.transactionCode = 3;
        entity.amount = null;
        const expectedError = [
          ErrorStatus.TRANSACTION_CREATE_ACCOUNT_ID_MANDATORY,
          ErrorStatus.TRANSACTION_CREATE_AMOUNT_MANDATORY,
          ErrorStatus.TRANSACTION_CREATE_TYPE_INVALID
        ]
        // Act
        const result = await transactionDomain.validateCreate(entity);

        // Assert
        assert.isNotEmpty(result);
        assert.deepEqual(result, expectedError,  'Error mismatched');
      });
  });

});
