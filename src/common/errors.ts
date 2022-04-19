import { Logger } from './log';

export async function errorHandler(error: Error) {
  Logger.error('Error Handler', error.message || `${error}`);
}
