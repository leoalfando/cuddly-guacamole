import { ResponseOutput } from '../../commons/ResponseOutput';
import { assert } from 'chai';
import UserService from '../UserService';
import * as sinon from 'sinon';
import context from 'jest-plugin-context';
import UserRepository from '../repositories/UserRepository';
import UserEntity from '../entities/UserEntity';
import ChildUserEntity from '../entities/ChildUserEntity';
import { ErrorStatus } from '../../commons/ErrorStatus';
import UserCriteriaDto from '../dtos/UserCriteriaDto';
import UserCriteriaEntity from '../entities/UserCriteriaEntity';
import UserConverter from '../converters/UserConverter';
import UserDto from '../dtos/UserDto';
import UserListDto from '../dtos/UserListDto';
import Pagination from '../../commons/models/Pagination';


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


    const userDto1 = new UserDto();
    userDto1.id = 100;
    userDto1.firstName = "Leo";
    userDto1.lastName = "Alfando";
    const userDto2 = new UserDto();
    userDto2.firstName = "John";
    userDto2.lastName = "Junior";
    userDto2.guardianId = 100;
    userDto2.id = 100;

    beforeEach(() => {
        userService = new UserService();
        userRepository = new UserRepository();
    });

    afterEach(() => {
        sandbox.restore();
    });
    context('#getUserList#', () => {
        it('should return 200 and user list', async () => {
            // Arrange
            const criteriaDto = new UserCriteriaDto();
            criteriaDto.keyword = 'le';
            criteriaDto.page = '1';
            criteriaDto.limit = '5';
            const criteriaEntity = new UserCriteriaEntity();
            criteriaEntity.keyword = "le";
            criteriaEntity.page = 1;
            criteriaEntity.limit = 5;
            const userListDto = new UserListDto();
            userListDto.data = [userDto1, userDto2];
            const pagination = new Pagination();
            pagination.page = 1;
            pagination.total = 2;
            pagination.limit = 5;
            userListDto.pagination = pagination;
            const expectedResult = ResponseOutput.createOkResponse(userListDto);

            const convertToCriteriaEntityStub = sandbox.stub(UserConverter.prototype, 'convertToCriteriaEntity').resolves(criteriaEntity);
            const repoGetUserListStub = sandbox.stub(UserRepository.prototype, 'getUserList').resolves([[user1, user2],2]);
            const convertToDtoStub = sandbox.stub(UserConverter.prototype, 'convertToDto');
            convertToDtoStub.onCall(0).resolves(userDto1);
            convertToDtoStub.onCall(1).resolves(userDto2);

            const result = await userService.getUserList(criteriaDto);

            assert.isNotNull(result, 'result should NOT be null');
            assert.deepEqual(result.statusCode, 200);
            assert.deepEqual(result,expectedResult);
            assert.isNotNull(result.body);
            sinon.assert.calledOnce(convertToCriteriaEntityStub);
            sinon.assert.calledOnce(repoGetUserListStub);
            sinon.assert.calledTwice(convertToDtoStub);
        });

        it('should return error and empty body', async () => {
            // Arrange
            const criteriaDto = new UserCriteriaDto();
            criteriaDto.keyword = 'le';
            criteriaDto.page = '1';
            criteriaDto.limit = '5';
            const criteriaEntity = new UserCriteriaEntity();
            criteriaEntity.keyword = "le";
            criteriaEntity.page = 1;
            criteriaEntity.limit = 5;
            const expectedResult = ResponseOutput.createOkResponse(new UserListDto());

            const convertToCriteriaEntityStub = sandbox.stub(UserConverter.prototype, 'convertToCriteriaEntity').resolves(criteriaEntity);
            const repoGetUserListStub = sandbox.stub(UserRepository.prototype, 'getUserList').resolves([[],0]);
            const convertToDtoStub = sandbox.stub(UserConverter.prototype, 'convertToDto');

            const result = await userService.getUserList(criteriaDto);
            assert.isNotNull(result, 'result should NOT be null');
            assert.deepEqual(result.statusCode, 200);
            assert.deepEqual(result,expectedResult);
            assert.isNotNull(result.body);
            sinon.assert.calledOnce(convertToCriteriaEntityStub);
            sinon.assert.calledOnce(repoGetUserListStub);
            sinon.assert.notCalled(convertToDtoStub);
        });
    });
});
