class ApiMessageUtils {
  static requiredField(field: string) {
    return {'message': `${field} is required!`};
  }

  static unauthorized() {
    return {'message': `Invalid credentials.`};
  }
}

export default ApiMessageUtils;