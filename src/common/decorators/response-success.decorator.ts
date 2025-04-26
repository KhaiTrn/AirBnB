import { SetMetadata } from '@nestjs/common';

export const IS_SUCCESS_KEY = 'isSuccess';
export const ResponseSuccess = (mes: string) =>
  SetMetadata(IS_SUCCESS_KEY, mes);
