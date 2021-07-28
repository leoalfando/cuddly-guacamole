import axios from 'axios'
import env from "react-dotenv";
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
        page: 1,
        limit: 99999
      },
      headers: {
        'x-api-key': this.apiConfig.user.apiKey
      }
    });
  }

  getAccount = async (parameters) =>{
    return this.callAxios(this.apiConfig.account.url)
    .get('', {
      params:{
        userId: parameters.userId,
      },
      headers: {
        'x-api-key': this.apiConfig.user.apiKey
      },
    });
  }
  createAccount = async (parameters) =>{
    return this.callAxios(this.apiConfig.account.url)
    .post('', {
        userId: parameters.userId,
        amount: parameters.amount,
        type: parameters.type
    },{
      headers: {
        'x-api-key': this.apiConfig.account.apiKey
      },
    });
  }
  createTransaction = async (parameters) =>{
    return this.callAxios(this.apiConfig.transaction.url)
    .post('', {
      accountId: parameters.accountId,
      amount: parameters.amount,
      transactionCode: parameters.type
    },{
      headers: {
        'x-api-key': this.apiConfig.transaction.apiKey
      },
    });
  }
  getTransactions = async(parameters) =>{
    return this.callAxios(this.apiConfig.transaction.url)
    .get('',{
      params: {
        accountId: parameters.accountId,
        transactionCode: 1,
        page: 1,
        limit: 99999
      },
      headers: {
        'x-api-key': this.apiConfig.user.apiKey
      }
    })
  }
}
