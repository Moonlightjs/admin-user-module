import { AdminJwtAuthGuard } from '@modules/admin-authentication/guards/admin-jwt-auth.guard';
import { AdminUser } from '@modules/admin-authentication/admin-user.decorator';
import { RequireAdminPermissions } from '@modules/admin-authorization';
import { CreateAdminUserInput } from '@modules/admin-user/dto';
import { ChangeAdminPasswordInput } from '@modules/admin-user/dto/change-admin-password.input';
import { UpdateAdminUserInput } from '@modules/admin-user/dto/update-admin-user.input';
import {
  FindManyArgs,
  FindOneArgs,
  IgnoreAuthorization,
  OpenApiPaginationResponse,
  OpenApiResponse,
  SuccessResponseDto,
} from '@moonlightjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ADMIN_PERMISSIONS } from '@src/constants';
import * as bcrypt from 'bcrypt';
import { AdminJwtPayload } from '../admin-authentication/admin-jwt-payload';
import { AdminUserService } from './admin-user.service';
import { AdminUserDto } from './dto/admin-user.dto';

@ApiTags('admin-user')
@Controller({
  path: 'admin/users',
  version: '1',
})
@UseGuards(AdminJwtAuthGuard)
export class AdminUserController {
  constructor(protected readonly adminUserService: AdminUserService) {}

  @ApiBearerAuth()
  @OpenApiResponse({
    status: HttpStatus.OK,
    model: AdminUserDto,
  })
  @IgnoreAuthorization()
  @Get('me')
  getMe(
    @AdminUser() user: AdminJwtPayload,
    @Query() params: Pick<Prisma.AdminUserFindFirstArgs, 'include' | 'select'>,
  ) {
    return this.adminUserService.findOne({
      where: {
        id: user.sub,
      },
      ...params,
    });
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: SuccessResponseDto })
  @IgnoreAuthorization()
  @HttpCode(HttpStatus.OK)
  @Post('/change-password')
  async updatePassword(
    @AdminUser() user: AdminJwtPayload,
    @Body() params: ChangeAdminPasswordInput,
  ) {
    return this.adminUserService.changePassword(user.sub, params);
  }

  @ApiBearerAuth()
  @ApiBody({
    type: CreateAdminUserInput,
  })
  @OpenApiResponse({
    status: HttpStatus.CREATED,
    model: AdminUserDto,
  })
  @RequireAdminPermissions(ADMIN_PERMISSIONS.AdminUser.Create)
  @Post()
  async create(
    @Body() createAdminUserInput: CreateAdminUserInput,
    @Query() params: Omit<Prisma.AdminUserCreateArgs, 'data'>,
  ) {
    const salt = await bcrypt.genSalt();
    return this.adminUserService.create({
      ...params,
      data: {
        ...createAdminUserInput,
        password: createAdminUserInput.password
          ? await bcrypt.hash(createAdminUserInput.password, salt)
          : null,
      },
    });
  }

  @ApiQuery({
    type: FindManyArgs,
  })
  @ApiBearerAuth()
  @OpenApiResponse({
    status: HttpStatus.OK,
    model: AdminUserDto,
    isArray: true,
  })
  @RequireAdminPermissions(ADMIN_PERMISSIONS.AdminRole.Read)
  @Get()
  findAll(@Query() params: Prisma.AdminUserFindManyArgs) {
    return this.adminUserService.findAll(params);
  }

  @ApiQuery({
    type: FindManyArgs,
  })
  @ApiBearerAuth()
  @OpenApiPaginationResponse(AdminUserDto)
  @RequireAdminPermissions(ADMIN_PERMISSIONS.AdminRole.Read)
  @Get('/pagination')
  findAllPagination(@Query() params: Prisma.AdminUserFindManyArgs) {
    return this.adminUserService.findAllPagination(params);
  }

  @ApiQuery({
    type: FindOneArgs,
  })
  @ApiBearerAuth()
  @OpenApiResponse({ status: HttpStatus.OK, model: AdminUserDto })
  @RequireAdminPermissions(ADMIN_PERMISSIONS.AdminRole.Read)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query() params: Prisma.AdminUserFindUniqueArgs,
  ) {
    params.where = {
      id,
    };
    return this.adminUserService.findOne(params);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: SuccessResponseDto })
  @RequireAdminPermissions(ADMIN_PERMISSIONS.AdminRole.Update)
  @Patch(':id/reset-password')
  async resetPassword(@Param('id') id: string) {
    return this.adminUserService.resetPassword(id);
  }

  @ApiBearerAuth()
  @OpenApiResponse({ status: HttpStatus.OK, model: AdminUserDto })
  @RequireAdminPermissions(ADMIN_PERMISSIONS.AdminRole.Update)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminUserInput: UpdateAdminUserInput,
    @Query() params: Omit<Prisma.AdminUserUpdateArgs, 'data' | 'where'>,
  ) {
    return this.adminUserService.update({
      ...params,
      where: {
        id,
      },
      data: {
        ...updateAdminUserInput,
      },
    });
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: SuccessResponseDto })
  @RequireAdminPermissions(ADMIN_PERMISSIONS.AdminRole.Delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminUserService.remove({
      id,
    });
  }
}
