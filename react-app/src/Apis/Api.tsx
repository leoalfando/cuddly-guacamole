import axios from 'axios'
import env from "react-dotenv";
console.log('env',env);
export default class Api {
  apiConfig = {
    account: {
      url: env.ACCOUNT_SERVER_URL,
      apiKey: env.ACCOUNT_SERVER_API_KEY,
    },
    user: {
     url: env.USER_SERVER_URL,
     apiKey: env.USER_SERVER_API_KEY,
    },
    transaction: {
      url: env.TRANSACTION_SERVER_URL,
      apiKey: env.TRANSACTION_SERVER_API_KEY,
    }
  }
  private callAxios = (url) => {
    return axios.create({
      baseURL: url,
    });
  }
  getUserList = async (parameters) =>{
    return this.callAxios(this.apiConfig.user.url)
    .get('', {
      params:{
        keyword: parameters.keyword,
        page: parameters.page,
        limit: parameters.limit
      },
      headers: {
        'x-api-key': this.apiConfig.user.apiKey
      }
    });
  }

  getAccounts = async (parameters) =>{
    return this.callAxios(this.apiConfig.account.url)
    .get('', {
      params:{
        userId: parameters.userId,
      },
      headers: {
        'x-api-key': this.apiConfig.user.apiKey
      }
    });
  }
}
