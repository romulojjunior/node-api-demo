import express from 'express';
import AuthenticateUserUC, { InvalidCredentialsError } from '../../domain/usecases/auth/authenticate-user-uc';
import db from '../../data/models';
import CreateApikeyUC from '../../domain/usecases/auth/create-apikey-uc';
import LoggerUtils from '../../domain/utils/logger-utils';

class AuthRouter {

  create(): express.Router {
    const router = express.Router();

    router.post('/user', async (req, res) => {
      const { email, password } = req.body;

      try {
        const authenticateUserUC = new AuthenticateUserUC(db);
        const user = await authenticateUserUC.execute({
          email,
          password
        });

        const userId = await user.toJSON();
        const createApiKeyUC = new CreateApikeyUC(db);
        const apikey = await createApiKeyUC.execute({userId});
        const apikeyJSON = await apikey.toJSON();
        res.json({
          apikey: apikeyJSON.value
        });
      } catch (e) {
        if (e instanceof InvalidCredentialsError) {
          res.sendStatus(401);
        } else {
          LoggerUtils.e('AuthRouter: POST user/', { e });
          res.sendStatus(500);
        }
      }
    });

    return router;
  }
}

export default AuthRouter;