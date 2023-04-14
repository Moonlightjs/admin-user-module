import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ADMIN_CHECK_POLICIES_KEY,
  CheckPolicyParams,
} from './admin-policy.decorator';
import PBAC, { PBACPolicy } from '@moonlightjs/pbac/pbac';
import { AdminPolicyService } from './admin-policy.service';
import { AdminPolicyDto } from './dto';
import { AdminJwtPayload } from '@modules/admin-authentication/admin-jwt-payload';
import { HttpErrorException, removeUndefinedProps } from '@moonlightjs/common';
import { IS_IGNORE_AUTHORIZATION } from '@moonlightjs/common';
import { AdminUserErrorCodes } from '@src/constants';

@Injectable()
export class AdminPoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private adminPolicyService: AdminPolicyService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isIgnoreAuthorization = this.reflector.getAllAndOverride<boolean>(
      IS_IGNORE_AUTHORIZATION,
      [context.getHandler(), context.getClass()],
    );
    if (isIgnoreAuthorization) {
      return true;
    }
    const evaluationParams =
      this.reflector.get<CheckPolicyParams[]>(
        ADMIN_CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const request = context.switchToHttp().getRequest();
    const user: AdminJwtPayload = request.user;
    if (!user) {
      throw new HttpErrorException(AdminUserErrorCodes.Unauthorized);
    }
    const policies = await this.adminPolicyService.getAllUserPolicies(user.sub);
    const pbac = new PBAC(policies.map(fromAdminPolicyToPBACPolicy));

    const result = evaluationParams.every((evaluationParam) => {
      const requestParams = evaluationParam.getParamsFromRequest
        ? evaluationParam.getParamsFromRequest(request)
        : {};
      const buildParams = Object.assign({}, requestParams);
      return pbac.evaluate({
        ...evaluationParam,
        context: {
          user: user,
          req: buildParams,
        },
      });
    });
    if (!result) {
      throw new HttpErrorException(AdminUserErrorCodes.PermissionDenied);
    }
    return true;
  }
}

const fromAdminPolicyToPBACPolicy = (adminPolicy: AdminPolicyDto) => {
  const pbacPolicy: PBACPolicy = {
    Version: adminPolicy.version,
    Statement: adminPolicy.statements.map((statement) => {
      const a = {
        Sid: statement.Sid || undefined,
        Effect: statement.Effect,
        Action: statement.Action || undefined,
        NotAction: statement.NotAction || undefined,
        Resource: statement.Resource || undefined,
        NotResource: statement.NotResource || undefined,
        Principal: statement.Principal || undefined,
        NotPrincipal: statement.NotPrincipal || undefined,
        Condition: statement.Condition || undefined,
      };
      return removeUndefinedProps(a);
    }),
  };
  return pbacPolicy;
};
