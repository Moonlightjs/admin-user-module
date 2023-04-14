import { Test, TestingModule } from '@nestjs/testing';
import { AdminPolicyController } from './admin-policy.controller';
import { AdminPolicyService } from './admin-policy.service';

describe('AdminPolicyController', () => {
  let controller: AdminPolicyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminPolicyController],
      providers: [AdminPolicyService],
    }).compile();

    controller = module.get<AdminPolicyController>(AdminPolicyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
