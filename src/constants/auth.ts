// eslint-disable-next-line @typescript-eslint/no-var-requires
const Reconfig = require('reconfig');

const resourcesConfig = new Reconfig(
  {
    namespace: 'admin-user-module',
    templates: {
      adminUsers: '/{{ namespace }}/adminUser/[userId]',
      adminRoles: '/{{ namespace }}/adminRole/[roleId]',
      adminPolicies: '/{{ namespace }}/adminPolicy/[policyId]',
    },
  },
  {
    paramsInterpolation: ['[', ']'],
    envPrefix: 'MOONLIGHT_RESOURCES',
  },
);

export const Actions = {
  AdminUsers: {
    FullAccess: 'admin-user-module:users:*',
    ReadUser: 'admin-user-module:users:read',
    CreateUser: 'admin-user-module:users:create',
    UpdateUser: 'admin-user-module:users:update',
    ResetPassword: 'admin-user-module:users:reset-password',
    DeleteUser: 'admin-user-module:users:delete',
    // ListUsers: 'admin-user-module:users:list',
    // SearchUsers: 'admin-user-module:users:search',
    // AddUserPolicy: 'admin-user-module:users:policy:add',
    // ReplaceUserPolicy: 'admin-user-module:users:policy:replace',
    // AmendUserPolicies: 'admin-user-module:users:policy:amend',
    // RemoveUserPolicy: 'admin-user-module:users:policy:remove',
    // ListUserTeams: 'admin-user-module:users:teams:list',
    // ReplaceUserTeams: 'admin-user-module:users:teams:replace',
    // DeleteUserTeams: 'admin-user-module:users:teams:remove',
    // ListUserPolicies: 'admin-user-module:users:policies',
  },
  AdminRoles: {
    FullAccess: 'admin-user-module:roles:*',
    ReadRole: 'admin-user-module:roles:read',
    CreateRole: 'admin-user-module:roles:create',
    UpdateRole: 'admin-user-module:roles:update',
    DeleteRole: 'admin-user-module:roles:delete',
    // ListPolicies: 'admin-user-module:policies:list',
    // SearchPolicies: 'admin-user-module:policies:search',
    // ReadPolicyVariables: 'admin-user-module:policies:variables',
    // ListPolicyInstances: 'admin-user-module:policies:instances',
  },
  AdminPolicies: {
    FullAccess: 'admin-user-module:policies:*',
    CreatePolicy: 'admin-user-module:policies:create',
    UpdatePolicy: 'admin-user-module:policies:update',
    ReadPolicy: 'admin-user-module:policies:read',
    DeletePolicy: 'admin-user-module:policies:delete',
    // ListPolicies: 'admin-user-module:policies:list',
    // SearchPolicies: 'admin-user-module:policies:search',
    // ReadPolicyVariables: 'admin-user-module:policies:variables',
    // ListPolicyInstances: 'admin-user-module:policies:instances',
  },
};

function getResource(type: string, data: Record<string, any> = {}) {
  const template = resourcesConfig.get(`templates.${type}`);

  const params = template
    .match(/[^[\]]+(?=])/g)
    .reduce((prev: any, match: string) => {
      const name = match.replace(/[[]]/g, '');
      return Object.assign(prev, { [name]: data[name] || '*' });
    }, {});

  return resourcesConfig.get(`templates.${type}`, params);
}

const adminUsers = getResource.bind(null, 'adminUsers');
const adminRoles = getResource.bind(null, 'adminRoles');
const adminPolicies = getResource.bind(null, 'adminPolicies');

export const Resources = {
  adminUsers,
  adminPolicies,
  adminRoles,
};
