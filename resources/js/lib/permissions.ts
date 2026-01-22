export type UserRole = 'Administrador' | 'Moderador' | 'Leitor';

export const ROLE_LEVELS: Record<UserRole, number> = {
    Administrador: 1,
    Moderador: 2,
    Leitor: 3,
};

export interface PermissionCheck {
    canView: boolean;
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
}

export function getUserPermissions(userRole?: string): PermissionCheck {
    if (!userRole) {
        return {
            canView: false,
            canCreate: false,
            canEdit: false,
            canDelete: false,
        };
    }

    const role = userRole as UserRole;
    const level = ROLE_LEVELS[role] || 999;

    return {
        canView: level <= ROLE_LEVELS.Leitor,
        canCreate: level <= ROLE_LEVELS.Administrador,
        canEdit: level <= ROLE_LEVELS.Moderador,
        canDelete: level <= ROLE_LEVELS.Administrador,
    };
}

export function canEditUser(
    currentUserRole?: string,
    targetUserId?: number,
    currentUserId?: number,
): boolean {
    if (!currentUserRole) return false;

    const permissions = getUserPermissions(currentUserRole);

    if (!permissions.canEdit) return false;

    if (targetUserId === currentUserId) {
        return false;
    }

    return true;
}

export function canDeleteUser(currentUserRole?: string): boolean {
    if (!currentUserRole) return false;
    return getUserPermissions(currentUserRole).canDelete;
}

export function canCreateUser(currentUserRole?: string): boolean {
    if (!currentUserRole) return false;
    return getUserPermissions(currentUserRole).canCreate;
}
