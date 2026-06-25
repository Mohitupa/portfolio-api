import { RolePermissionModel } from "./role-permission.model";
import { RoleModel } from "../role/role.model";
import { PermissionModel } from "../permission/permission.model";

const assignPermissionsToRole = async (
  roleId: string,
  permissionIds: string[]
) => {

  const role =
    await RoleModel.findById(roleId);

  if (!role) {
    throw new Error("Role not found");
  }

  const permissions =
    await PermissionModel.find({
      _id: {
        $in: permissionIds,
      },
    });

  if (
    permissions.length !==
    permissionIds.length
  ) {
    throw new Error(
      "One or more permissions are invalid"
    );
  }

  await RolePermissionModel.deleteMany({
    roleId,
  });

  if (!permissionIds.length) {
    return [];
  }

  const payload =
    permissionIds.map(
      permissionId => ({
        roleId,
        permissionId,
      })
    );

  return RolePermissionModel.insertMany(
    payload
  );
};

const getRolePermissions = async (
  roleId: string
) => {

  const role =
    await RoleModel.findById(roleId);

  if (!role) {
    throw new Error(
      "Role not found"
    );
  }

  return RolePermissionModel.find({
    roleId,
  })
    .populate("permissionId")
    .populate(
      "roleId",
      "name displayName"
    );
};

export const RolePermissionService = {
  assignPermissionsToRole,
  getRolePermissions,
};