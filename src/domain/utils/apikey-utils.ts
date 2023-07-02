import bcrypt from 'bcrypt';

class ApiKeyUtils {

  static create(value: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(value, salt);
  }
}

export default ApiKeyUtils;