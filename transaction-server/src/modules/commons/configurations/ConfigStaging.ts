// tslint:disable:object-literal-sort-keys
import * as envConfig from 'dotenv';
import { Environment } from '../Enum';

if (process.env.NODE_ENV && process.env.NODE_ENV === Environment.STAGING) {
    envConfig.load({ path: '.env' });
}

const ConfigStaging = {
};

export default ConfigStaging;
