import { ResponseOutput } from '../../commons/ResponseOutput';
import axios, { AxiosRequestConfig } from 'axios';
import TransactionEntity from '../entities/TransactionEntity';
import ConfigurationManager from '../../commons/configurations/ConfigurationManager';

const config = new ConfigurationManager();
const transactionConfig = config.getConfigs('accountServer');
export default class TransactionRepository {
    public async getList(transactionEntity: TransactionEntity): Promise<ResponseOutput> {
        const url: string = `${transactionConfig.apiUrl}`;
        const options: AxiosRequestConfig = {
            method: 'POST',
            baseURL: url,
            data: transactionEntity,
            headers: {'x-api-key': transactionConfig.apiKey},
            timeout: 5000
        };
        console.log('options',options);
        const response = await axios.request(options);
        const responseOutput = new ResponseOutput();
        if (response.status === 200) {
          const result = response?.data.map((country: any) => {
              return this.adaptData(country);
          });
          responseOutput.body = result;
          return responseOutput;
        }
        else{
          return responseOutput;
        }
    }

  public adaptData = (data): TransactionEntity => {
      const result = new TransactionEntity();
      result.id = data.id
      result.amount = data.amount
      result.transactionCode = data.transactionCode
      result.createdDate = data.createdDate
      result.accountId = data.accountId
      return result;
  }
}
