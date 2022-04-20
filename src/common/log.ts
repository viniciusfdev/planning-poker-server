export class Logger {
  private static formatLog(context: string, message: string | number): string {
    return `[${new Date().toISOString()}](${context})::${message}`;
  }

  static info(context: string, message: string | number) {
    console.info(Logger.formatLog(context, message));
  }

  static trace(context: string, message: string | number) {
    console.trace(Logger.formatLog(context, message));
  }

  static error(context: string, message: string | number) {
    console.error(Logger.formatLog(context, message));
  }

  static warn(context: string, message: string | number) {
    console.warn(Logger.formatLog(context, message));
  }
}
