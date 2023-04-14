import { AdminJwtAuthGuard } from '@modules/admin-authentication/guards/admin-jwt-auth.guard';
import { AdminPermissionService } from './admin-permission.service';
import { RequireAdminPermissions } from './admin-permissions.decorator';
import { AdminPermissionDto } from './dto/admin-permission.dto';
import { CreateAdminPermissionInput } from './dto/create-admin-permission.input';
import { UpdateAdminPermissionInput } from './dto/update-admin-permission.input';
import {
  FindManyArgs,
  FindOneArgs,
  HttpErrorException,
  OpenApiPaginationResponse,
  OpenApiResponse,
  SuccessResponseDto,
} from '@moonlightjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
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
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ADMIN_PERMISSIONS } from '@src/constants/admin-permission';
import { AdminUserErrorCodes } from '@src/constants/error-codes';

@ApiTags('admin-permission')
@Controller({
  path: 'admin/permissions',
  version: '1',
})
@UseGuards(AdminJwtAuthGuard)
export class AdminPermissionController {
  constructor(protected readonly permissionService: AdminPermissionService) {}

  @ApiOperation({ deprecated: true })
  @ApiBearerAuth()
  @ApiBody({
    type: CreateAdminPermissionInput,
  })
  @OpenApiResponse({
    status: HttpStatus.CREATED,
    model: AdminPermissionDto,
  })
  @RequireAdminPermissions(ADMIN_PERMISSIONS.AdminPermission.Create)
  @Post()
  create(
    @Body() createAdminPermissionInput: CreateAdminPermissionInput,
    @Query() params: Omit<Prisma.AdminPermissionCreateArgs, 'data'>,
  ) {
    return this.permissionService.create({
      ...params,
      data: {
        ...createAdminPermissionInput,
      },
    });
  }

  @ApiOperation({ deprecated: true })
  @ApiQuery({
    type: FindManyArgs,
  })
  @ApiBearerAuth()
  @OpenApiResponse({
    status: HttpStatus.OK,
    model: AdminPermissionDto,
    isArray: true,
  })
  @RequireAdminPermissions(ADMIN_PERMISSIONS.AdminPermission.Read)
  @Get()
  findAll(@Query() params: Prisma.AdminPermissionFindManyArgs) {
    return this.permissionService.findAll(params);
  }

  @ApiOperation({ deprecated: true })
  @ApiQuery({
    type: FindManyArgs,
  })
  @ApiBearerAuth()
  @OpenApiPaginationResponse(AdminPermissionDto)
  @RequireAdminPermissions(ADMIN_PERMISSIONS.AdminPermission.Read)
  @Get('/pagination')
  findAllPagination(@Query() params: Prisma.AdminPermissionFindManyArgs) {
    return this.permissionService.findAllPagination(params);
  }

  @ApiOperation({ deprecated: true })
  @ApiQuery({
    type: FindOneArgs,
  })
  @ApiBearerAuth()
  @OpenApiResponse({ status: HttpStatus.OK, model: AdminPermissionDto })
  @RequireAdminPermissions(ADMIN_PERMISSIONS.AdminPermission.Read)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query() params: Prisma.AdminPermissionFindUniqueArgs,
  ) {
    params.where = {
      id,
    };
    return this.permissionService.findOne(params);
  }

  @ApiOperation({ deprecated: true })
  @ApiBearerAuth()
  @OpenApiResponse({ status: HttpStatus.OK, model: AdminPermissionDto })
  @ApiBody({
    type: UpdateAdminPermissionInput,
  })
  @RequireAdminPermissions(ADMIN_PERMISSIONS.AdminPermission.Update)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminPermissionInput: UpdateAdminPermissionInput,
    @Query() params: Omit<Prisma.AdminPermissionUpdateArgs, 'data' | 'where'>,
  ) {
    const adminPermission = await this.permissionService.findOne({
      where: { id },
    });
    if (adminPermission.isSystem) {
      throw new HttpErrorException(
        AdminUserErrorCodes.SystemPermissionCannotModified,
      );
    }
    return this.permissionService.update({
      ...params,
      where: {
        id,
      },
      data: {
        ...updateAdminPermissionInput,
      },
    });
  }

  @ApiOperation({ deprecated: true })
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: SuccessResponseDto })
  @RequireAdminPermissions(ADMIN_PERMISSIONS.AdminPermission.Delete)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const adminPermission = await this.permissionService.findOne({
      where: { id },
    });
    if (adminPermission.isSystem) {
      throw new HttpErrorException(
        AdminUserErrorCodes.SystemPermissionCannotDeleted,
      );
    }
    return this.permissionService.remove({
      id,
    });
  }
}
