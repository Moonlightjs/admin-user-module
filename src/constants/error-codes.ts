import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '@moonlightjs/common';
const PREFIX_MODULE_NAME = 'ADMIN_USER';
const ErrorCodes: Record<string, ErrorCode> = {
  Unauthorized: {
    code: `${PREFIX_MODULE_NAME}:100000`,
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Unauthorized',
  },
  UserDeactivated: {
    code: `${PREFIX_MODULE_NAME}:100001`,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'User is deactivated',
  },
  UserDeleted: {
    code: `${PREFIX_MODULE_NAME}:100002`,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'User is deleted',
  },
  UserAlreadyExists: {
    code: `${PREFIX_MODULE_NAME}:100003`,
    statusCode: HttpStatus.NOT_FOUND,
    message: 'User already exists',
  },
  UserNotExists: {
    code: `${PREFIX_MODULE_NAME}:100003`,
    statusCode: HttpStatus.NOT_FOUND,
    message: 'User is not exist',
  },
  PasswordInvalid: {
    code: `${PREFIX_MODULE_NAME}:100004`,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Password invalid',
  },
};
export { ErrorCodes };
