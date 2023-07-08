import PasswordUtils from '../../../src/domain/utils/password-utils';

describe('PasswordUtils test.', () => {
  const password = '123411234';
  const passwordHash = '$2b$10$0b1.I5i6YW90NgH9FY2B7unw.sv3i8ADqIA4itjqq08Aa13U7M7Ii';

  test('Validate a password. Success case.', async () => {
    const isValid = PasswordUtils.validate(password, passwordHash);
    expect(isValid).toBeTruthy();
  });
});
