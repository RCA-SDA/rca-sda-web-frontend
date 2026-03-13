export const getRoleRedirectPath = (role: string): string => {
    console.log('🔍 getRoleRedirectPath called with role:', role);

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

    // Return the specific role path or fallback to dashboard
    const redirectPath = roleRedirects[role] || '/dashboard';
    console.log('🔍 Role redirect result:', redirectPath);

    return redirectPath;
};
