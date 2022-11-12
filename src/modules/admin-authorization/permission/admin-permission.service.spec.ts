import { Test, TestingModule } from '@nestjs/testing';
import { AdminPermissionService } from './admin-permission.service';

describe('AdminPermissionService', () => {
  let service: AdminPermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminPermissionService],
    }).compile();

    service = module.get<AdminPermissionService>(AdminPermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
