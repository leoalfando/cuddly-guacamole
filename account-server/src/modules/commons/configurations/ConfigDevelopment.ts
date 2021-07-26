// tslint:disable:object-literal-sort-keys
import * as envConfig from 'dotenv';
import { Environment } from '../Enum';

if (process.env.NODE_ENV && process.env.NODE_ENV === Environment.DEVELOPMENT) {
    envConfig.load({ path: '.env' });
}

const ConfigDevelopment = {
    accountServer:
    {
        apiUrl: "localhost:3020/api/v1/transactions",
        apiKey: process.env.ACCOUNT_SERVER_API_KEY,
    }
};

export default ConfigDevelopment;
