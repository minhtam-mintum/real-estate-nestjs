import { ResponseCode } from './common/enums/responseCode';

export interface ResponseType<T> {
  code: ResponseCode;
  data: T;
  message?: string;
}
