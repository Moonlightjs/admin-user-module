import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DEFAULT_SKIP, DEFAULT_TAKE } from '@src/constants';
import { PagedResultDto, Pagination, toDto } from '@moonlightjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { AdminUserDto, AdminUserProfileDto } from './dto';

@Injectable()
export class AdminUserService {
  constructor(protected prisma: PrismaService) {}

  async getMe(id: string) {
    const adminUser = await this.prisma.adminUser.findFirst({
      where: {
        id,
      },
    });
    return toDto(AdminUserProfileDto, adminUser);
  }

  async findOne(params: Prisma.AdminUserFindFirstArgs) {
    const adminUser = await this.prisma.adminUser.findFirst(params);
    return toDto(AdminUserDto, adminUser);
  }

  async findAll(params: Prisma.AdminUserFindManyArgs): Promise<AdminUserDto[]> {
    params.skip = params.skip ?? DEFAULT_SKIP;
    params.take = params.take ?? DEFAULT_TAKE;
    const adminUsers = await this.prisma.adminUser.findMany(params);
    return adminUsers.map((adminUser) => toDto(AdminUserDto, adminUser));
  }

  async findAllPagination(
    params: Prisma.AdminUserFindManyArgs,
  ): Promise<PagedResultDto<AdminUserDto>> {
    params.skip = params.skip ?? DEFAULT_SKIP;
    params.take = params.take ?? DEFAULT_TAKE;
    const [adminUsers, total] = await Promise.all([
      this.prisma.adminUser.findMany(params),
      this.prisma.adminUser.count({
        where: params.where,
      }),
    ]);
    return PagedResultDto.create({
      data: adminUsers.map((adminUser) => toDto(AdminUserDto, adminUser)),
      pagination: Pagination.create({
        take: params.take,
        skip: params.skip,
        total: total,
      }),
    });
  }

  async create(params: Prisma.AdminUserCreateArgs): Promise<AdminUserDto> {
    const adminUser = await this.prisma.adminUser.create(params);
    return toDto(AdminUserDto, adminUser);
  }

  async update(params: Prisma.AdminUserUpdateArgs): Promise<AdminUserDto> {
    const adminUser = await this.prisma.adminUser.update(params);
    return toDto(AdminUserDto, adminUser);
  }

  async remove(where: Prisma.AdminUserWhereUniqueInput): Promise<boolean> {
    const adminUser = await this.prisma.adminUser.delete({
      where,
    });
    return !!adminUser;
  }
}
