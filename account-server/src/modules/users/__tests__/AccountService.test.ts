import { ResponseOutput } from '../../commons/ResponseOutput';
import { assert } from 'chai';
import UserService from '../UserService';
import * as sinon from 'sinon';
import context from 'jest-plugin-context';
import UserRepository from '../repositories/UserRepository';
import UserEntity from '../entities/UserEntity';
import ChildUserEntity from '../entities/ChildUserEntity';
import { ErrorStatus } from '../../commons/ErrorStatus';


describe('UserService', () => {
    let userService: UserService;
    let userRepository: UserRepository;
    const sandbox: any = sinon.createSandbox();

    const user1 = new UserEntity();
    user1.id = 100;
    user1.firstName = "Leo";
    user1.lastName = "Alfando";
    const user2 = new ChildUserEntity();
    user2.firstName = "John";
    user2.lastName = "Junior";
    user2.guardianId = 100;
    user2.id = 100;

    beforeEach(() => {
        userService = new UserService();
        userRepository = new UserRepository();
    });

    afterEach(() => {
        sandbox.restore();
    });
    context('#getUsers#', () => {
        it('should return 200 and user list', async () => {
            const keyword = "leo";

            const repoGetUserResult = [user1,user2];
            const repoGetUserStub = sandbox.stub(UserRepository.prototype, 'getUsers').resolves(repoGetUserResult);
            const result = await userService.getUsers(keyword);

            assert.isNotNull(result, 'result should NOT be null');
            assert.deepEqual(result.statusCode, 200);
            assert.isNotNull(result.body);
            assert.deepEqual(result.body, repoGetUserResult);
            sinon.assert.calledOnce(repoGetUserStub);
        });

        it('should return error and empty body', async () => {
            const keyword = "leo";
            const repoGetUserResult = [];
            const repoGetUserStub = sandbox.stub(UserRepository.prototype, 'getUsers').resolves(repoGetUserResult);
            const result = await userService.getUsers(keyword);

            assert.isNotNull(result, 'result should NOT be null');
            assert.deepEqual(result.statusCode, 404);
            assert.isUndefined(result.body);
            sinon.assert.calledOnce(repoGetUserStub);
        });

        it('should return error if keyword is less than 3 letter', async () => {
            const keyword = "le";
            const repoGetUserStub = sandbox.stub(UserRepository.prototype, 'getUsers');
            const result = await userService.getUsers(keyword);
            const expectedResult = ResponseOutput.createBadRequestResponse(ErrorStatus.ACCOUNT_GET_LIST_MIN_KEYWORD);
            assert.isNotNull(result, 'result should NOT be null');
            assert.deepEqual(result, expectedResult);
            sinon.assert.notCalled(repoGetUserStub);
        });

    });
});
