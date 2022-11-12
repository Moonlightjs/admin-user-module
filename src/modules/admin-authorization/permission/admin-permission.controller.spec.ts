import { AdminPermissionController } from '@modules/admin-authorization/permission/admin-permission.controller';
import { AdminPermissionService } from '@modules/admin-authorization/permission/admin-permission.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AdminPermissionController', () => {
  let controller: AdminPermissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminPermissionController],
      providers: [AdminPermissionService],
    }).compile();

    controller = module.get<AdminPermissionController>(
      AdminPermissionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
