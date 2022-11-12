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
import * as bcrypt from 'bcrypt';
import { AdminJwtPayload } from '../admin-authentication/admin-jwt-payload';
import { AdminUserDto } from './dto/admin-user.dto';
import { AdminUserService } from './admin-user.service';
import { AdminJwtAuthGuard } from '@modules/admin-authentication';
import {
  OpenApiResponse,
  IgnoreAuthorization,
  FindManyArgs,
  OpenApiPaginationResponse,
  FindOneArgs,
  SuccessResponseDto,
} from '@moonlightjs/common';
import { UpdateAdminUserInput } from '@modules/admin-user/dto/update-admin-user.input';
import { AdminUser } from '@modules/admin-authentication/admin-user.decorator';
import { CreateAdminUserInput } from '@modules/admin-user/dto';

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
  @ApiBody({
    type: CreateAdminUserInput,
  })
  @OpenApiResponse({
    status: HttpStatus.CREATED,
    model: AdminUserDto,
  })
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
  @Get()
  findAll(@Query() params: Prisma.AdminUserFindManyArgs) {
    return this.adminUserService.findAll(params);
  }

  @ApiQuery({
    type: FindManyArgs,
  })
  @ApiBearerAuth()
  @OpenApiPaginationResponse(AdminUserDto)
  @Get('/pagination')
  findAllPagination(@Query() params: Prisma.AdminUserFindManyArgs) {
    return this.adminUserService.findAllPagination(params);
  }

  @ApiQuery({
    type: FindOneArgs,
  })
  @ApiBearerAuth()
  @OpenApiResponse({ status: HttpStatus.OK, model: AdminUserDto })
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
  @OpenApiResponse({ status: HttpStatus.OK, model: AdminUserDto })
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
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminUserService.remove({
      id,
    });
  }
}
