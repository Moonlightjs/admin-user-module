import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AdminUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const adminUser = request.adminUser;
    return data ? adminUser?.[data] : adminUser;
  },
);
