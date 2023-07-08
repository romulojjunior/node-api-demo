class ApiMessageUtils {
  static requiredField(field: string) {
    return {'message': `${field} is required!`};
  }

  static unauthorized() {
    return {'message': `Invalid credentials.`};
  }

  static emailUnAvailable() {
    return {'message': `Email unavailable.`};
  }
}

export default ApiMessageUtils;