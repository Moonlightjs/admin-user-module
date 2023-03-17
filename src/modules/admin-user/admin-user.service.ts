import {
  HttpErrorException,
  PagedResultDto,
  Pagination,
  PrismaService,
  toDto,
} from '@moonlightjs/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import {
  AdminUserErrorCodes,
  DEFAULT_SKIP,
  DEFAULT_TAKE,
} from '@src/constants';
import * as bcrypt from 'bcrypt';
import { ChangeAdminPasswordInput } from 'module/modules/admin-user/dto/change-admin-password.input';
import { AdminUserDto, AdminUserProfileDto } from './dto';

@Injectable()
export class AdminUserService {
  constructor(
    protected prisma: PrismaService,
    protected configService: ConfigService,
  ) {}

  async getMe(id: string) {
    const adminUser = await this.prisma.adminUser.findFirst({
      where: {
        id,
      },
    });
    return toDto(AdminUserProfileDto, adminUser);
  }

  async changePassword(
    id: string,
    input: ChangeAdminPasswordInput,
  ): Promise<void> {
    const user = await this.prisma.adminUser.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.password) {
      if (!(await bcrypt.compare(input.currentPassword, user.password))) {
        throw new HttpErrorException(AdminUserErrorCodes.PasswordInvalid);
      }
    }

    const salt = await bcrypt.genSalt();
    await this.prisma.adminUser.update({
      where: {
        id,
      },
      data: {
        updatedAt: new Date(),
        password: await bcrypt.hash(input.newPassword, salt),
      },
    });
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

  async resetPassword(id: string): Promise<void> {
    const defaultPassword = this.configService.get<string>(
      'DEFAULT_PASSWORD',
      '!moonlight@123',
    );
    const salt = await bcrypt.genSalt();
    await this.prisma.adminUser.update({
      where: {
        id,
      },
      data: {
        updatedAt: new Date(),
        password: await bcrypt.hash(defaultPassword, salt),
      },
    });
  }
}
