class ApiMessageUtils {
  static requiredHeaderField(field: string) {
    return {'message': `Header ${field} is required!`};
  }

  static requiredField(field: string) {
    return {'message': `${field} is required!`};
  }

  static notFound(resource: string) {
    return {'message': `${resource} not found!`};
  }

  static unauthorized() {
    return {'message': `Invalid credentials.`};
  }

  static emailUnAvailable() {
    return {'message': `Email unavailable.`};
  }
}

export default ApiMessageUtils;