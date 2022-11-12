import * as moduleAlias from 'module-alias';
moduleAlias.addAliases({
  '@modules': `${__dirname}/modules`,
  '@src': `${__dirname}`,
});
export * from '@modules/index';
export * from '@modules/admin-authentication/admin-authentication.module';
export * from '@modules/admin-authorization/admin-authorization.module';
export * from '@modules/admin-user/admin-user.module';
