// tslint:disable:object-literal-sort-keys
import * as envConfig from 'dotenv';
import { Environment } from '../Enum';

if (process.env.NODE_ENV && process.env.NODE_ENV === Environment.STAGING) {
    envConfig.load({ path: '.env' });
}

const ConfigStaging = {
    accountServer:
    {
    apiUrl: process.env.TRANSACTION_SERVER_API,
        apiKey: process.env.TRANSACTION_SERVER_API_KEY,
    }
};

export default ConfigStaging;
