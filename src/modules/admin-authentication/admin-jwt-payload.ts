export interface AdminJwtPayload {
  sub: string; // subject
  username: string; // username
  permissions?: string[]; // user permissions
  roles: string[]; // user roles
}
