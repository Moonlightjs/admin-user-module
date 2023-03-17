import { AdminAuthenticationService } from '@modules/admin-authentication/admin-authentication.service';
import {
  AdminLoginDto,
  AdminLoginInput,
  AdminRefreshTokenInput,
} from '@modules/admin-authentication/dto';
import { AdminRefreshTokenDto } from '@modules/admin-authentication/dto/admin-refresh-token.dto';
import { AdminLocalAuthGuard } from '@modules/admin-authentication/guards';
import AdminJwtRefreshGuard from '@modules/admin-authentication/guards/admin-jwt-refresh.guard';
import { OpenApiResponse } from '@moonlightjs/common';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('admin-auth')
@Controller({
  path: 'admin/auth',
  version: '1',
})
export class AdminAuthenticationController {
  constructor(
    protected _adminAuthenticationService: AdminAuthenticationService,
  ) {}

  @ApiBody({
    type: AdminLoginInput,
  })
  @OpenApiResponse({
    status: HttpStatus.OK,
    model: AdminLoginDto,
  })
  @UseGuards(AdminLocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: any) {
    return this._adminAuthenticationService.login(req.adminUser);
  }

  @ApiBody({
    type: AdminRefreshTokenInput,
  })
  @OpenApiResponse({
    status: HttpStatus.OK,
    model: AdminRefreshTokenDto,
  })
  @UseGuards(AdminJwtRefreshGuard)
  @Post('refresh-token')
  async refreshToken(@Req() req: any) {
    return this._adminAuthenticationService.refreshToken(req.adminUser);
  }
}
