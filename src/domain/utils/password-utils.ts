import bcrypt from 'bcrypt';

class PasswordUtils {

  static createHash(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  static validate(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}

export default PasswordUtils;