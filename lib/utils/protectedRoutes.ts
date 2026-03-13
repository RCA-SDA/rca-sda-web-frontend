import { getUserFromToken } from './jwt';

export const getRequiredRole = (path: string): string | null => {
  const rolePathMap: Record<string, string> = {
    '/users/elder_male': 'ELDER_MALE',
    '/users/elder_female': 'ELDER_FEMALE',
    '/users/assistant_elder_male': 'ASSISTANT_ELDER_MALE',
    '/users/assistant_elder_female': 'ASSISTANT_ELDER_FEMALE',
    '/users/evangelism_leader_male': 'EVANGELISM_LEADER_MALE',
    '/users/evangelism_leader_female': 'EVANGELISM_LEADER_FEMALE',
    '/users/ja_leader_male': 'JA_LEADER_MALE',
    '/users/ja_leader_female': 'JA_LEADER_FEMALE',
    '/users/mifem_leader': 'MIFEM_LEADER',
    '/users/assistant_mifem_leader': 'ASSISTANT_MIFEM_LEADER',
    '/users/community_outreach_leader': 'COMMUNITY_OUTREACH_LEADER',
    '/users/choir_leader': 'CHOIR_LEADER',
    '/users/choir_patron': 'CHOIR_PATRON',
    '/users/choir_disciplinary_leader': 'CHOIR_DISCIPLINARY_LEADER',
    '/users/choir_matron': 'CHOIR_MATRON',
    '/users/choir_secretary': 'CHOIR_SECRETARY',
    '/users/church_secretary': 'CHURCH_SECRETARY',
    '/users/grand_father': 'GRAND_FATHER',
    '/users/grand_mother': 'GRAND_MOTHER',
    '/users/father': 'FATHER',
    '/users/mother': 'MOTHER',
    '/users/deacon': 'DEACON',
    '/users/deacon_leader_male': 'DEACON_LEADER_MALE',
    '/users/deacon_leader_female': 'DEACON_LEADER_FEMALE',
    '/admin': 'ADMIN',
  };

  // Check for exact matches first
  if (rolePathMap[path]) {
    return rolePathMap[path];
  }

  // Check for partial matches (for sub-pages)
  for (const [route, role] of Object.entries(rolePathMap)) {
    if (path.startsWith(route + '/')) {
      return role;
    }
  }

  return null;
};

export const canAccessRoute = (path: string): boolean => {
  const user = getUserFromToken();
  if (!user || !user.role) return false;

  const requiredRole = getRequiredRole(path);
  if (!requiredRole) return true; // No specific role required

  return user.role === requiredRole;
};

export const getRedirectForUnauthorizedUser = (currentPath: string): string => {
  const user = getUserFromToken();
  if (!user) return '/login';

  // If user is logged in but can't access this route, redirect to their own page
  const userRole = user.role;
  const roleRedirects: Record<string, string> = {
    'USER': '/dashboard',
    'ADMIN': '/admin',
    'ELDER_MALE': '/users/elder_male',
    'ELDER_FEMALE': '/users/elder_female',
    'ASSISTANT_ELDER_MALE': '/users/assistant_elder_male',
    'ASSISTANT_ELDER_FEMALE': '/users/assistant_elder_female',
    'EVANGELISM_LEADER_MALE': '/users/evangelism_leader_male',
    'EVANGELISM_LEADER_FEMALE': '/users/evangelism_leader_female',
    'JA_LEADER_MALE': '/users/ja_leader_male',
    'JA_LEADER_FEMALE': '/users/ja_leader_female',
    'MIFEM_LEADER': '/users/mifem_leader',
    'ASSISTANT_MIFEM_LEADER': '/users/assistant_mifem_leader',
    'COMMUNITY_OUTREACH_LEADER': '/users/community_outreach_leader',
    'CHOIR_LEADER': '/users/choir_leader',
    'CHOIR_PATRON': '/users/choir_patron',
    'CHOIR_DISCIPLINARY_LEADER': '/users/choir_disciplinary_leader',
    'CHOIR_MATRON': '/users/choir_matron',
    'CHOIR_SECRETARY': '/users/choir_secretary',
    'CHURCH_SECRETARY': '/users/church_secretary',
    'GRAND_FATHER': '/users/grand_father',
    'GRAND_MOTHER': '/users/grand_mother',
    'FATHER': '/users/father',
    'MOTHER': '/users/mother',
    'DEACON': '/users/deacon',
    'DEACON_LEADER_MALE': '/users/deacon_leader_male',
    'DEACON_LEADER_FEMALE': '/users/deacon_leader_female',
  };

  return roleRedirects[userRole] || '/dashboard';
};
