import request from "supertest";
import app from "../../../../../src/app";
import db, { User } from "../../../../../src/data/models";
import userFactory from "../../../../factory/user-factory";
import storyFactory from "../../../../factory/story-factory";
import PasswordUtils from "../../../../../src/domain/utils/password-utils";
import { randomUUID } from "crypto";

describe('UserAccountRouter', () => {
  test('Success GET /api/v1/user/stories/', async() => {
    const { User, ApiKey, Story } = db.models;
    const apiKeyValue = randomUUID();
    const userPassword = '12341234';

    const user: User = await User.create(userFactory({
      password: PasswordUtils.createHash(userPassword)
    }));  

    const apikey = await ApiKey.create({
      value: apiKeyValue,
      userId: user.toJSON().id,
      isEnabled: true
    });

    const story = await Story.create(storyFactory({
      userId: user.toJSON().id,
    }));

    const payload = {};
    const response = await request(app)
      .get('/api/v1/user/stories')
      .set('Accept', 'application/json')
      .set('apikey', apiKeyValue)
      .send(payload);

    expect(response.status).toEqual(200);
    expect(response.body[0]).not.toBeNull();
    expect(response.body[0].userId).toBe(user.toJSON().id);

    await story.destroy();
    await apikey.destroy();
    await user.destroy();
  });

  test('Invalid ApiKey GET /api/v1/user/stories/', async() => {
    const payload = {};
    const response = await request(app)
      .get('/api/v1/user/stories')
      .set('Accept', 'application/json')
      .set('apikey', 'INVALID_APIKEY')
      .send(payload);

    expect(response.status).toEqual(401);
  });
});