export type Role = 'ADMIN' | 'CMS' | 'LEAD_MGT';

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  ADMIN: [
    '/dashboard',
    '/cms',
    '/leads',
    '/events',
    '/users',
    '/settings'
  ],
  CMS: [
    '/cms'
  ],
  LEAD_MGT: [
    '/leads',
    '/events'
  ]
};

// Helper function to check if a role has access to a specific path
export function hasAccess(role: Role, pathname: string): boolean {
  if (!ROLE_PERMISSIONS[role]) return false;

  // Exact match or sub-path match (e.g., /cms/home matches /cms)
  return ROLE_PERMISSIONS[role].some(allowedRoute => 
    pathname === allowedRoute || pathname.startsWith(allowedRoute + '/')
  );
}
