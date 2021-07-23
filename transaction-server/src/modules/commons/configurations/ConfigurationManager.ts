import 'reflect-metadata';
import { Environment } from '../Enum';
import ConfigDevelopment from './ConfigDevelopment';
// import { ConfigProduction } from './ConfigProduction';
// import { ConfigStaging } from './ConfigStaging';

export default class ConfigurationManager {
    private configs: any;

    constructor() {
        switch (process.env.NODE_ENV) {
            case Environment.DEVELOPMENT:
                this.configs = ConfigDevelopment;
                break;
                // case Environment.STAGING:
                //     this.configs = ConfigStaging;
                //     break;
                // case Environment.PRODUCTION:
                //     this.configs = ConfigProduction;
                //     break;
            default:
                this.configs = ConfigDevelopment;
                break;
        }
    }

    public getConfigs(section?: string): any {
        if (section) {
            return this.configs?.section;
        }
        return this.configs;
    }
}
