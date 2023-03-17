import { ADMIN_ROLES_KEY } from '@modules/admin-authorization/role/admin-roles.decorator';
import { IS_IGNORE_AUTHORIZATION } from '@moonlightjs/common';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminRolesGuard implements CanActivate {
  constructor(protected reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isIgnoreAuthorization = this.reflector.getAllAndOverride<boolean>(
      IS_IGNORE_AUTHORIZATION,
      [context.getHandler(), context.getClass()],
    );
    if (isIgnoreAuthorization) {
      return true;
    }
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ADMIN_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user?.roles?.includes(role));
  }
}
