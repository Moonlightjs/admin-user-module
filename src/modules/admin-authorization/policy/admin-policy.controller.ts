import { AdminJwtAuthGuard } from '@modules/admin-authentication/guards/admin-jwt-auth.guard';
import { AdminPolicyService } from './admin-policy.service';
import { AdminPolicyDto } from './dto/admin-policy.dto';
import { CreateAdminPolicyInput } from './dto/create-admin-policy.input';
import { UpdateAdminPolicyInput } from './dto/update-admin-policy.input';
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
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { AdminUserErrorCodes } from '@src/constants/error-codes';
import { AdminCheckPolicies } from './admin-policy.decorator';
import { Actions, Resources } from '@src/constants/auth';
import { AdminPoliciesGuard } from './admin-policy.guard';

@ApiTags('admin-policy')
@Controller({
  path: 'admin/policies',
  version: '1',
})
@UseGuards(AdminJwtAuthGuard, AdminPoliciesGuard)
export class AdminPolicyController {
  constructor(protected readonly policyService: AdminPolicyService) {}

  @ApiBearerAuth()
  @ApiBody({
    type: CreateAdminPolicyInput,
  })
  @OpenApiResponse({
    status: HttpStatus.CREATED,
    model: AdminPolicyDto,
  })
  @AdminCheckPolicies({
    action: Actions.AdminPolicies.CreatePolicy,
    resource: Resources.adminPolicies({
      policyId: '.policyId',
    }),
  })
  @Post()
  create(
    @Body() createAdminPolicyInput: CreateAdminPolicyInput,
    @Query() params: Omit<Prisma.AdminPolicyCreateArgs, 'data'>,
  ) {
    return this.policyService.create({
      ...params,
      data: {
        ...createAdminPolicyInput,
        statements:
          createAdminPolicyInput.statements as unknown as Prisma.InputJsonArray,
      },
    });
  }

  @ApiQuery({
    type: FindManyArgs,
  })
  @ApiBearerAuth()
  @OpenApiResponse({
    status: HttpStatus.OK,
    model: AdminPolicyDto,
    isArray: true,
  })
  @AdminCheckPolicies({
    action: Actions.AdminPolicies.ReadPolicy,
    resource: Resources.adminPolicies({
      policyId: '.policyId',
    }),
  })
  @Get()
  findAll(@Query() params: Prisma.AdminPolicyFindManyArgs) {
    return this.policyService.findAll(params);
  }

  @ApiQuery({
    type: FindManyArgs,
  })
  @ApiBearerAuth()
  @OpenApiPaginationResponse(AdminPolicyDto)
  @AdminCheckPolicies({
    action: Actions.AdminPolicies.ReadPolicy,
    resource: Resources.adminPolicies({
      policyId: '.policyId',
    }),
  })
  @Get('/pagination')
  findAllPagination(@Query() params: Prisma.AdminPolicyFindManyArgs) {
    return this.policyService.findAllPagination(params);
  }

  @ApiQuery({
    type: FindOneArgs,
  })
  @ApiBearerAuth()
  @OpenApiResponse({ status: HttpStatus.OK, model: AdminPolicyDto })
  @AdminCheckPolicies({
    action: Actions.AdminPolicies.ReadPolicy,
    resource: Resources.adminPolicies({
      policyId: '.policyId',
    }),
  })
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query() params: Prisma.AdminPolicyFindUniqueArgs,
  ) {
    params.where = {
      id,
    };
    return this.policyService.findOne(params);
  }

  @ApiBearerAuth()
  @OpenApiResponse({ status: HttpStatus.OK, model: AdminPolicyDto })
  @ApiBody({
    type: UpdateAdminPolicyInput,
  })
  @AdminCheckPolicies({
    action: Actions.AdminPolicies.UpdatePolicy,
    resource: Resources.adminPolicies({
      policyId: '.policyId',
    }),
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminPolicyInput: UpdateAdminPolicyInput,
    @Query() params: Omit<Prisma.AdminPolicyUpdateArgs, 'data' | 'where'>,
  ) {
    const adminPolicy = await this.policyService.findOne({
      where: { id },
    });
    if (adminPolicy.isSystem) {
      throw new HttpErrorException(
        AdminUserErrorCodes.SystemPolicyCannotModified,
      );
    }
    return this.policyService.update({
      ...params,
      where: {
        id,
      },
      data: {
        ...updateAdminPolicyInput,
        statements:
          updateAdminPolicyInput.statements as unknown as Prisma.InputJsonArray,
      },
    });
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: SuccessResponseDto })
  @AdminCheckPolicies({
    action: Actions.AdminPolicies.DeletePolicy,
    resource: Resources.adminPolicies({
      policyId: '.policyId',
    }),
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const adminPolicy = await this.policyService.findOne({
      where: { id },
    });
    if (adminPolicy.isSystem) {
      throw new HttpErrorException(
        AdminUserErrorCodes.SystemPolicyCannotDeleted,
      );
    }
    return this.policyService.remove({
      id,
    });
  }
}
