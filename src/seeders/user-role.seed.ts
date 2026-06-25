import { AdminUserModel } from "../modules/admin-user/admin-user.model";
import { RoleModel } from "../modules/role/role.model";
import { UserRoleModel } from "../modules/user-role/user-role.model";

export const userRoleSeeder = async () => {

  const users =
    await AdminUserModel.find();

  for (const user of users) {

    // Temporary migration
    const roleName = (user as any).role;

    if (!roleName) {
      continue;
    }

    const role =
      await RoleModel.findOne({
        name: roleName,
      });

    if (!role) {
      console.warn(
        `Role "${roleName}" not found for ${user.email}`
      );
      continue;
    }

    const exists =
      await UserRoleModel.findOne({
        userId: user._id,
        roleId: role._id,
      });

    if (exists) {
      continue;
    }

    await UserRoleModel.create({
      userId: user._id,
      roleId: role._id,
    });

    console.log(
      `${user.email} → ${role.name}`
    );
  }

  console.log(
    "User roles seeded successfully."
  );
};