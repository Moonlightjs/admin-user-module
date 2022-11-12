import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_IGNORE_AUTHORIZATION } from '@moonlightjs/common';
import { ADMIN_REQUIRE_PERMISSIONS_KEY } from './admin-permissions.decorator';

@Injectable()
export class AdminPermissionsGuard implements CanActivate {
  constructor(protected reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isIgnoreAuthorization = this.reflector.getAllAndOverride<boolean>(
      IS_IGNORE_AUTHORIZATION,
      [context.getHandler(), context.getClass()],
    );
    if (isIgnoreAuthorization) {
      return true;
    }
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      ADMIN_REQUIRE_PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredPermissions.some((permission) =>
      user?.permission?.includes(permission),
    );
  }
}
