export default class LoggerUtils {
  static d(message: string, params: any) {
    console.debug(message, params);
  }

  static i(message: string, params: any) {
    console.info(message, params);
  }

  static e(message: string, params: any) {
    console.error(message, params);
  }
}