import { NextFunction, Request, Response } from 'express';
import ApiMessageUtils from '../../domain/utils/api-message-utils';
import AuthenticateApikeyUC, { InvalidCredentialsError } from '../../domain/usecases/auth/authenticate-apikey-uc';
import LoggerUtils from '../../domain/utils/logger-utils';
import db from '../../data/models';


const authenticateByApiKey = async (req: Request, res: Response, next: NextFunction) => {
  const apikey = req.headers.apikey as string;

  if (!apikey) {
    res.status(422).json(ApiMessageUtils.requiredHeaderField('apikey'));
    return;
  }

  try {
    await new AuthenticateApikeyUC(db).execute({ apikey });
    next();
  } catch (e) {
    if (e instanceof InvalidCredentialsError) {
      res.status(401).json(ApiMessageUtils.unauthorized());
    } else {
      LoggerUtils.e('authenticateByApiKey: Internal Error: ', { e });
      res.sendStatus(500);
    }
  }
};


export default authenticateByApiKey;