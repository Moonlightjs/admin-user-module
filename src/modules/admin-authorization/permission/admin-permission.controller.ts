import { AdminJwtAuthGuard } from '@modules/admin-authentication';
import { AdminPermissionService } from '@modules/admin-authorization/permission/admin-permission.service';
import { AdminPermissionDto } from '@modules/admin-authorization/permission/dto/admin-permission.dto';
import { CreateAdminPermissionInput } from '@modules/admin-authorization/permission/dto/create-admin-permission.input';
import { UpdateAdminPermissionInput } from '@modules/admin-authorization/permission/dto/update-admin-permission.input';
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
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  FindManyArgs,
  FindOneArgs,
  OpenApiPaginationResponse,
  OpenApiResponse,
  SuccessResponseDto,
} from '@moonlightjs/common';

@ApiTags('admin-permission')
@Controller({
  path: 'admin/permissions',
  version: '1',
})
@UseGuards(AdminJwtAuthGuard)
export class AdminPermissionController {
  constructor(protected readonly permissionService: AdminPermissionService) {}

  @ApiBearerAuth()
  @ApiBody({
    type: CreateAdminPermissionInput,
  })
  @OpenApiResponse({
    status: HttpStatus.CREATED,
    model: AdminPermissionDto,
  })
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

  @ApiQuery({
    type: FindManyArgs,
  })
  @ApiBearerAuth()
  @OpenApiResponse({
    status: HttpStatus.OK,
    model: AdminPermissionDto,
    isArray: true,
  })
  @Get()
  findAll(@Query() params: Prisma.AdminPermissionFindManyArgs) {
    return this.permissionService.findAll(params);
  }

  @ApiQuery({
    type: FindManyArgs,
  })
  @ApiBearerAuth()
  @OpenApiPaginationResponse(AdminPermissionDto)
  @Get('/pagination')
  findAllPagination(@Query() params: Prisma.AdminPermissionFindManyArgs) {
    return this.permissionService.findAllPagination(params);
  }

  @ApiQuery({
    type: FindOneArgs,
  })
  @ApiBearerAuth()
  @OpenApiResponse({ status: HttpStatus.OK, model: AdminPermissionDto })
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

  @ApiBearerAuth()
  @OpenApiResponse({ status: HttpStatus.OK, model: AdminPermissionDto })
  @ApiBody({
    type: UpdateAdminPermissionInput,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminPermissionInput: UpdateAdminPermissionInput,
    @Query() params: Omit<Prisma.AdminPermissionUpdateArgs, 'data' | 'where'>,
  ) {
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

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: SuccessResponseDto })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionService.remove({
      id,
    });
  }
}
