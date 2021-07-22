import { assert } from 'chai';
import AccountService from '../AccountService';
import * as sinon from 'sinon';
import context from 'jest-plugin-context';
import AccountRepository from '../repositories/AccountRepository';
import AccountEntity from '../entities/AccountEntity';
import ChildAccountEntity from '../entities/ChildAccountEntity';


describe('AccountService', () => {
    let accountService: AccountService;
    let accountRepository: AccountRepository;
    const sandbox: any = sinon.createSandbox();

    const account1 = new AccountEntity();
    account1.id = 100;
    account1.firstName = "Leo";
    account1.lastName = "Alfando";
    const account2 = new ChildAccountEntity();
    account2.firstName = "John";
    account2.lastName = "Junior";
    account2.guardianId = 100;
    account2.id = 100;

    beforeEach(() => {
        accountService = new AccountService();
        accountRepository = new AccountRepository();
    });

    afterEach(() => {
        sandbox.restore();
    });
    context('#getAccounts#', () => {
        it('should return 200 and account list', async () => {
            const keyword = "leo";

            const repoGetAccountResult = [account1,account2];
            const repoGetAccountStub = sandbox.stub(AccountRepository.prototype, 'getAccounts').resolves(repoGetAccountResult);
            const result = await accountService.getAccounts(keyword);

            assert.isNotNull(result, 'result should NOT be null');
            assert.deepEqual(result.statusCode, 200);
            assert.isNotNull(result.body);
            assert.deepEqual(result.body, repoGetAccountResult);
            sinon.assert.calledOnce(repoGetAccountStub);
        });

        it('should return error and empty body', async () => {
            const keyword = "leo";
            const repoGetAccountResult = [];
            const repoGetAccountStub = sandbox.stub(AccountRepository.prototype, 'getAccounts').resolves(repoGetAccountResult);
            const result = await accountService.getAccounts(keyword);

            assert.isNotNull(result, 'result should NOT be null');
            assert.deepEqual(result.statusCode, 404);
            assert.isUndefined(result.body);
            sinon.assert.calledOnce(repoGetAccountStub);
        });

    });
});
