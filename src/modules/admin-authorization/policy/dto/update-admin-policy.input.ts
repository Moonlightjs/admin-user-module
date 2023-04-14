import { PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CreateAdminPolicyInput } from './create-admin-policy.input';

@Expose()
export class UpdateAdminPolicyInput extends PartialType(
  CreateAdminPolicyInput,
) {}
