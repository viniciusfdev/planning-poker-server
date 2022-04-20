import { pick } from 'dot-object';
import { Logger } from './log';

export async function errorHandler(error: Error) {
  Logger.error('Error Handler', error.message || `${error}`);
}

export function throwMissingRequiredAttributes(object: any, attributes: string[]) {
  if (typeof object === 'object') {
    const missing = [];

    for (const attribute of object) {
      if (pick(attribute, object) == null) {
        missing.push(attribute);
      }
    }

    if (missing.length > 0) {
      throw Error(`Missing required attributes [${missing}].`);
    }
  } else {
    throw Error(`Missing required attributes [${attributes}]`);
  }
}
