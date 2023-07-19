import request from "supertest";
import app from "../../../../../src/app";
import db from "../../../../../src/data/models";
import userFactory from "../../../../factory/user-factory";
import PasswordUtils from "../../../../../src/domain/utils/password-utils";

describe('UserAccountRouter', () => {
  test('Success POST /api/v1/users/account/signin', async() => {
    const { User, ApiKey } = db.models;

    const userPassword = '12341234';
    const user = await User.create(userFactory({
      password: PasswordUtils.createHash(userPassword)
    }));  

    const userJSON = user.toJSON();

    const payload = {
      email: userJSON.email, 
      password: userPassword
    };

    const response = await request(app)
      .post('/api/v1/users/account/signin')
      .set('Accept', 'application/json')
      .send(payload);

    expect(response.status).toEqual(200);
    expect(response.body.apikey).not.toBeNull();

    await ApiKey.destroy({ where: { userId: userJSON.id }});
    await user.destroy();
  });

  test('Success POST /api/v1/users/account/signup', async() => {
    const { User } = db.models;

    const payload = userFactory({});

    const response = await request(app)
      .post('/api/v1/users/account/signup')
      .set('Accept', 'application/json')
      .send(payload);

    expect(response.status).toEqual(200);

    await User.destroy({ where: { email: payload.email, name: payload.name }});
  });
});