import { AdminPermissionDto } from '@modules/admin-authorization/permission/dto/admin-permission.dto';
import { Injectable } from '@nestjs/common';
import { AdminPermission, Prisma } from '@prisma/client';
import { PrismaService } from '@src/infra/prisma/prisma.service';
import { PagedResultDto, Pagination, toDto } from '@moonlightjs/common';

@Injectable()
export class AdminPermissionService {
  constructor(protected prisma: PrismaService) {}

  async findOne(params: Prisma.AdminPermissionFindFirstArgs) {
    const adminPermission = await this.prisma.adminPermission.findFirst(params);
    return toDto(AdminPermissionDto, adminPermission);
  }

  async findAll(
    params: Prisma.AdminPermissionFindManyArgs,
  ): Promise<AdminPermissionDto[]> {
    if (!params.skip) {
      params.skip = 0;
    }
    if (!params.take) {
      params.take = 20;
    }
    const adminPermissions = await this.prisma.adminPermission.findMany(params);
    return adminPermissions.map((adminPermission: AdminPermission) =>
      toDto(AdminPermissionDto, adminPermission),
    );
  }

  async findAllPagination(
    params: Prisma.AdminPermissionFindManyArgs,
  ): Promise<PagedResultDto<AdminPermissionDto>> {
    if (!params.skip) {
      params.skip = 0;
    }
    if (!params.take) {
      params.take = 20;
    }
    const [adminPermissions, total] = await Promise.all([
      this.prisma.adminPermission.findMany(params),
      this.prisma.adminPermission.count({
        where: params.where,
      }),
    ]);
    return PagedResultDto.create({
      data: adminPermissions.map((adminPermission: AdminPermission) =>
        toDto(AdminPermissionDto, adminPermission),
      ),
      pagination: Pagination.create({
        take: params.take,
        skip: params.skip,
        total: total,
      }),
    });
  }

  async create(
    params: Prisma.AdminPermissionCreateArgs,
  ): Promise<AdminPermissionDto> {
    const adminPermission = await this.prisma.adminPermission.create(params);
    return toDto(AdminPermissionDto, adminPermission);
  }

  async update(
    params: Prisma.AdminPermissionUpdateArgs,
  ): Promise<AdminPermissionDto> {
    const adminPermission = await this.prisma.adminPermission.update(params);
    return toDto(AdminPermissionDto, adminPermission);
  }

  async remove(
    where: Prisma.AdminPermissionWhereUniqueInput,
  ): Promise<boolean> {
    const adminPermission = await this.prisma.adminPermission.delete({
      where,
    });
    return !!adminPermission;
  }
}