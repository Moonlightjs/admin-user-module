import { AdminRoleDto } from '@modules/admin-authorization/role/dto/admin-role.dto';
import {
  PagedResultDto,
  Pagination,
  PrismaService,
  toDto,
} from '@moonlightjs/common';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DEFAULT_SKIP, DEFAULT_TAKE } from '@src/constants';

@Injectable()
export class AdminRoleService {
  constructor(protected prisma: PrismaService) {}

  async findOne(params: Prisma.AdminRoleFindFirstArgs) {
    const adminRole = await this.prisma.adminRole.findFirst(params);
    return toDto<AdminRoleDto>(AdminRoleDto, adminRole);
  }

  async findAll(params: Prisma.AdminRoleFindManyArgs): Promise<AdminRoleDto[]> {
    params.skip = params.skip ?? DEFAULT_SKIP;
    params.take = params.take ?? DEFAULT_TAKE;
    const adminRoles = await this.prisma.adminRole.findMany(params);
    return adminRoles.map((adminRole) =>
      toDto<AdminRoleDto>(AdminRoleDto, adminRole),
    );
  }

  async findAllPagination(
    params: Prisma.AdminRoleFindManyArgs,
  ): Promise<PagedResultDto<AdminRoleDto>> {
    params.skip = params.skip ?? DEFAULT_SKIP;
    params.take = params.take ?? DEFAULT_TAKE;
    const [adminRoles, total] = await Promise.all([
      this.prisma.adminRole.findMany(params),
      this.prisma.adminRole.count({
        where: params.where,
      }),
    ]);
    return PagedResultDto.create({
      data: adminRoles.map<AdminRoleDto>((adminRole) =>
        toDto(AdminRoleDto, adminRole),
      ),
      pagination: Pagination.create({
        take: params.take,
        skip: params.skip,
        total: total,
      }),
    });
  }

  async create(params: Prisma.AdminRoleCreateArgs): Promise<AdminRoleDto> {
    const adminRole = await this.prisma.adminRole.create(params);
    return toDto<AdminRoleDto>(AdminRoleDto, adminRole);
  }

  async update(params: Prisma.AdminRoleUpdateArgs): Promise<AdminRoleDto> {
    const adminRole = await this.prisma.adminRole.update(params);
    return toDto<AdminRoleDto>(AdminRoleDto, adminRole);
  }

  async remove(where: Prisma.AdminRoleWhereUniqueInput): Promise<boolean> {
    const adminRole = await this.prisma.adminRole.delete({
      where,
    });
    return !!adminRole;
  }
}
