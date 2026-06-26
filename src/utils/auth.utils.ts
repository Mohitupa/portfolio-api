import { RolePermissionModel } from "../modules/role-permission/role-permission.model";
import { UserRoleModel } from "../modules/user-role/user-role.model";

export const getUserRolesAndPermissions =
async (userId: string) => {

    const userRoles =
        await UserRoleModel
            .find({
                userId,
            })
            .populate("roleId");

    const roles =
        userRoles.map(
            item => item.roleId as any
        );

    const roleIds =
        roles.map(role => role._id);

    const rolePermissions =
        await RolePermissionModel
            .find({
                roleId: {
                    $in: roleIds,
                },
            })
            .populate("permissionId");

    const permissions =
        rolePermissions.map(
            item =>
                (item.permissionId as any)
                .name
        );

    return {

        roles:
            roles.map(
                role => role.name
            ),

        permissions:
            [...new Set(permissions)],
    };
};