import { AdminPolicyDto } from '@modules/admin-authorization/policy/dto/admin-policy.dto';
import {
  PagedResultDto,
  Pagination,
  PrismaService,
  toDto,
} from '@moonlightjs/common';
import { Injectable } from '@nestjs/common';
import { AdminPolicy, Prisma } from '@prisma/client';

@Injectable()
export class AdminPolicyService {
  constructor(protected prisma: PrismaService) {}

  async findOne(
    params: Prisma.AdminPolicyFindFirstArgs,
  ): Promise<AdminPolicyDto> {
    const adminPolicy = await this.prisma.adminPolicy.findFirst(params);
    return toDto<AdminPolicyDto>(AdminPolicyDto, adminPolicy);
  }

  async findAll(
    params: Prisma.AdminPolicyFindManyArgs,
  ): Promise<AdminPolicyDto[]> {
    if (!params.skip) {
      params.skip = 0;
    }
    if (!params.take) {
      params.take = 20;
    }
    const adminPolicys = await this.prisma.adminPolicy.findMany(params);
    return adminPolicys.map((adminPolicy: AdminPolicy) =>
      toDto<AdminPolicyDto>(AdminPolicyDto, adminPolicy),
    );
  }

  async findAllPagination(
    params: Prisma.AdminPolicyFindManyArgs,
  ): Promise<PagedResultDto<AdminPolicyDto>> {
    if (!params.skip) {
      params.skip = 0;
    }
    if (!params.take) {
      params.take = 20;
    }
    const [adminPolicys, total] = await Promise.all([
      this.prisma.adminPolicy.findMany(params),
      this.prisma.adminPolicy.count({
        where: params.where,
      }),
    ]);
    return PagedResultDto.create({
      data: adminPolicys.map((adminPolicy: AdminPolicy) =>
        toDto<AdminPolicyDto>(AdminPolicyDto, adminPolicy),
      ),
      pagination: Pagination.create({
        take: params.take,
        skip: params.skip,
        total: total,
      }),
    });
  }

  async create(params: Prisma.AdminPolicyCreateArgs): Promise<AdminPolicyDto> {
    const adminPolicy = await this.prisma.adminPolicy.create(params);
    return toDto<AdminPolicyDto>(AdminPolicyDto, adminPolicy);
  }

  async update(params: Prisma.AdminPolicyUpdateArgs): Promise<AdminPolicyDto> {
    const adminPolicy = await this.prisma.adminPolicy.update(params);
    return toDto<AdminPolicyDto>(AdminPolicyDto, adminPolicy);
  }

  async remove(where: Prisma.AdminPolicyWhereUniqueInput): Promise<boolean> {
    const adminPolicy = await this.prisma.adminPolicy.delete({
      where,
    });
    return !!adminPolicy;
  }

  async getAllUserPolicies(userId: string): Promise<AdminPolicyDto[]> {
    const allUserPolicies: AdminPolicyDto[] = [];
    const [userPolicies, userRoles] = await Promise.all([
      await this.prisma.adminPolicy.findMany({
        where: {
          users: {
            some: {
              id: userId,
            },
          },
        },
      }),
      this.prisma.adminRole.findMany({
        where: {
          users: {
            some: {
              id: userId,
            },
          },
        },
        include: {
          policies: true,
        },
      }),
    ]);
    allUserPolicies.push(
      ...userPolicies.map((adminPolicy: AdminPolicy) =>
        toDto<AdminPolicyDto>(AdminPolicyDto, adminPolicy),
      ),
    );
    userRoles.forEach((role) => {
      role.policies.forEach((adminPolicy) => {
        allUserPolicies.push(
          toDto<AdminPolicyDto>(AdminPolicyDto, adminPolicy),
        );
      });
    });
    return allUserPolicies;
  }
}
