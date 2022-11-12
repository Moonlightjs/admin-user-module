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
import { AdminJwtAuthGuard } from '@modules/admin-authentication/guards/admin-jwt-auth.guard';
import { UpdateAdminRoleInput } from '@modules/admin-authorization/role/dto/update-admin-role.input';
import {
  FindManyArgs,
  FindOneArgs,
  OpenApiPaginationResponse,
  OpenApiResponse,
  SuccessResponseDto,
} from '@moonlightjs/common';
import { CreateAdminRoleInput } from '@modules/admin-authorization/role/dto/create-admin-role.input';
import { AdminRoleService } from '@modules/admin-authorization/role/admin-role.service';
import { AdminRoleDto } from '@modules/admin-authorization/role/dto/admin-role.dto';

@ApiTags('role')
@Controller({
  path: 'roles',
  version: '1',
})
@UseGuards(AdminJwtAuthGuard)
export class AdminRoleController {
  constructor(protected readonly adminRoleService: AdminRoleService) {}

  @ApiBearerAuth()
  @ApiBody({
    type: CreateAdminRoleInput,
  })
  @OpenApiResponse({
    status: HttpStatus.CREATED,
    model: AdminRoleDto,
  })
  @Post()
  create(
    @Body() createRoleInput: CreateAdminRoleInput,
    @Query() params: Omit<Prisma.AdminRoleCreateArgs, 'data'>,
  ) {
    return this.adminRoleService.create({
      ...params,
      data: createRoleInput,
    });
  }

  @ApiQuery({
    type: FindManyArgs,
  })
  @ApiBearerAuth()
  @OpenApiResponse({
    status: HttpStatus.OK,
    model: AdminRoleDto,
    isArray: true,
  })
  @Get()
  findAll(@Query() params: Prisma.AdminRoleFindManyArgs) {
    return this.adminRoleService.findAll(params);
  }

  @ApiQuery({
    type: FindManyArgs,
  })
  @ApiBearerAuth()
  @OpenApiPaginationResponse(AdminRoleDto)
  @Get('/pagination')
  findAllPagination(@Query() params: Prisma.AdminRoleFindManyArgs) {
    return this.adminRoleService.findAllPagination(params);
  }

  @ApiQuery({
    type: FindOneArgs,
  })
  @ApiBearerAuth()
  @OpenApiResponse({ status: HttpStatus.OK, model: AdminRoleDto })
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query() params: Prisma.AdminRoleFindUniqueArgs,
  ) {
    params.where = {
      id,
    };
    return this.adminRoleService.findOne(params);
  }

  @ApiBearerAuth()
  @OpenApiResponse({ status: HttpStatus.OK, model: AdminRoleDto })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleInput: UpdateAdminRoleInput,
    @Query() params: Omit<Prisma.AdminRoleUpdateArgs, 'data' | 'where'>,
  ) {
    return this.adminRoleService.update({
      ...params,
      where: {
        id,
      },
      data: {
        ...updateRoleInput,
      },
    });
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: SuccessResponseDto })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminRoleService.remove({
      id,
    });
  }
}
