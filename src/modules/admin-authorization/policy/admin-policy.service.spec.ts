import { Test, TestingModule } from '@nestjs/testing';
import { AdminPolicyService } from './admin-policy.service';

describe('AdminPolicyService', () => {
  let service: AdminPolicyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminPolicyService],
    }).compile();

    service = module.get<AdminPolicyService>(AdminPolicyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
