import { PBACEvaluateOptionsParams } from '@moonlightjs/pbac';
import { SetMetadata } from '@nestjs/common';

export interface CheckPolicyParams {
  action: string;
  resource: string;
  effect?: 'Allow' | 'Deny';
  getParamsFromRequest?: (request: Express.Request) => Record<string, string>;
}

export const ADMIN_CHECK_POLICIES_KEY = 'amin_check_policy';
export const AdminCheckPolicies = (...evaluationParams: CheckPolicyParams[]) =>
  SetMetadata(ADMIN_CHECK_POLICIES_KEY, evaluationParams);
