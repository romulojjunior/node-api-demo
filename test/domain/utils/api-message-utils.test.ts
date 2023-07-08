import ApiMessageUtils from '../../../src/domain/utils/api-message-utils';

describe('ApiMessageUtils test.', () => {

  test('Required field message.', async () => {
    const fieldName = 'email';
    const response = ApiMessageUtils.requiredField('email');
    expect(response.message).toBe(`${fieldName} is required!`);
  });

  test('Invalid credentials message.', async () => {
    const response = ApiMessageUtils.unauthorized();
    expect(response.message).toBe('Invalid credentials.');
  });


  test('Email unavailable message.', async () => {
    const response = ApiMessageUtils.emailUnAvailable();
    expect(response.message).toBe('Email unavailable.');
  });
});
