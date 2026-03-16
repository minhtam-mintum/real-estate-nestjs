import { ResponseCode } from '../enums/responseCode';

export class Helper {
  static response<T>(data: T, code?: ResponseCode, message?: string) {
    return {
      code: code ?? ResponseCode.SUCCESS,
      data,
      message,
    };
  }
}
