import { Query } from 'mongoose';

export function pagination<T>(
  request: Query<T[], T>,
  page?: number,
  take?: number,
) {
  const newRequest = request;
  if (page && page > 0 && take) {
    const skip = (page - 1) * take;
    newRequest.skip(skip).limit(take);
  }

  return newRequest;
}
