import { ResponseOutput } from '../../commons/ResponseOutput';
import axios, { AxiosRequestConfig } from 'axios';
import TransactionPayload from '../../accounts/dtos/TransactionPayload';
import ConfigurationManager from '../../commons/configurations/ConfigurationManager';
import axiosRetry from 'axios-retry';
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const config = new ConfigurationManager();
const transactionConfig = config.getConfigs('accountServer');
export default class TransactionRepository {
  public async createTransaction(transactionEntity: TransactionPayload): Promise<ResponseOutput> {
    const url: string = `${transactionConfig.apiUrl}/transactions`;
    const options: AxiosRequestConfig = {
        method: 'POST',
        baseURL: url,
        data: transactionEntity,
        headers: {'x-api-key': transactionConfig.apiKey},
        timeout: 5000
    };
    const response = await axios.request(options);
    const responseOutput = new ResponseOutput();
    responseOutput.statusCode = response.status;
    responseOutput.body = response.data;
    return responseOutput;
  }
}
