import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '@moonlightjs/common';
const PREFIX_MODULE_NAME = 'ADMIN_USER';
const AdminUserErrorCodes: Record<string, ErrorCode> = {
  // Authorization error
  Unauthorized: {
    code: `${PREFIX_MODULE_NAME}:100000`,
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Unauthorized',
  },
  // User error
  UserDeactivated: {
    code: `${PREFIX_MODULE_NAME}:200000`,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'User is deactivated',
  },
  UserDeleted: {
    code: `${PREFIX_MODULE_NAME}:200001`,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'User is deleted',
  },
  UserAlreadyExists: {
    code: `${PREFIX_MODULE_NAME}:200002`,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'User already exists',
  },
  UserNotExists: {
    code: `${PREFIX_MODULE_NAME}:100003`,
    statusCode: HttpStatus.NOT_FOUND,
    message: 'User is not exist',
  },
  PasswordInvalid: {
    code: `${PREFIX_MODULE_NAME}:200004`,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Password invalid',
  },
  // Permission error
  PermissionNotExists: {
    code: `${PREFIX_MODULE_NAME}:300000`,
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Permission not exists',
  },
  PermissionAlreadyExists: {
    code: `${PREFIX_MODULE_NAME}:300001`,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Permission already exists',
  },
  SystemPermissionCannotModified: {
    code: `${PREFIX_MODULE_NAME}:300002`,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'System permission cannot modified',
  },
  SystemPermissionCannotDeleted: {
    code: `${PREFIX_MODULE_NAME}:300003`,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'System permission cannot deleted',
  },
  // Role error
  RoleNotExists: {
    code: `${PREFIX_MODULE_NAME}:400000`,
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Role not exists',
  },
  RoleAlreadyExists: {
    code: `${PREFIX_MODULE_NAME}:400001`,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Role already exists',
  },
  SystemRoleCannotModified: {
    code: `${PREFIX_MODULE_NAME}:400002`,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'System role cannot modified',
  },
  SystemRoleCannotDeleted: {
    code: `${PREFIX_MODULE_NAME}:400003`,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'System role cannot deleted',
  },
};
export { AdminUserErrorCodes };
