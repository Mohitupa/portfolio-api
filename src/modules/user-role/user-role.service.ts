import { UserRoleModel } from "./user-role.model";
import { AdminUserModel } from "../admin-user/admin-user.model";
import { RoleModel } from "../role/role.model";

const assignRolesToUser = async (
  userId: string,
  roleIds: string[]
) => {

  const user =
    await AdminUserModel.findById(
      userId
    );

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  const roles =
    await RoleModel.find({
      _id: {
        $in: roleIds,
      },
    });

  if (
    roles.length !==
    roleIds.length
  ) {
    throw new Error(
      "One or more roles are invalid"
    );
  }

  await UserRoleModel.deleteMany({
    userId,
  });

  if (!roleIds.length) {
    return [];
  }

  const payload =
    roleIds.map(roleId => ({
      userId,
      roleId,
    }));

  return UserRoleModel.insertMany(
    payload
  );
};

const getUserRoles = async (
  userId: string
) => {

  const user =
    await AdminUserModel.findById(
      userId
    );

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  return UserRoleModel.find({
    userId,
  })
    .populate(
      "roleId"
    )
    .populate(
      "userId",
      "name email"
    );
};

export const UserRoleService = {
  assignRolesToUser,
  getUserRoles,
};