export default class LoggerUtils {
  static d(message: string, params?: Map<string, unknown>) {
    if (params) {
      console.debug(message, params);
      return;
    }
    console.debug(message);
  }

  static i(message: string, params?: Map<string, unknown>) {
    if (params) {
      console.info(message, params);
      return;
    }
    console.info(message);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static e(message: string, params?: any) {
    if (params) {
      console.error(message, params);
      return;
    }
    console.error(message);
  }
}