import { Request, Response, NextFunction } from 'express';
import { HTTP403Error } from '../utils/errorHandler/HttpErrors';

function handleAuthorization(req: Request, _res: Response, next: NextFunction): void{
  const apiKey = req.headers?.['x-api-key'];
  if (!validateApiKey(apiKey as string)) {
      throw new HTTP403Error('Invalid Api Key');
  } else {
      next();
  }
};

function validateApiKey(apiKey: string) : boolean{
  // ideally valid apikey will be stored in secure place eg: (AWS-api gateway), terraform vault
  const validApiKeys = ['someapikey', 'thisisavalidapikey'];
  return validApiKeys.includes(apiKey);
}

export { handleAuthorization };
export default { handleAuthorization };
