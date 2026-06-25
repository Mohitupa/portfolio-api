import { RoleModel } from "../modules/role/role.model";

const roles = [

  {
    name: "SUPER_ADMIN",
    displayName: "Super Admin",
    description: "Full system access",
    isSystem: true,
    sortOrder: 1,
  },

  {
    name: "ADMIN",
    displayName: "Administrator",
    description: "Manage portfolios and media",
    isSystem: true,
    sortOrder: 2,
  },

  {
    name: "EDITOR",
    displayName: "Editor",
    description: "Manage portfolio content",
    isSystem: true,
    sortOrder: 3,
  },

  {
    name: "VIEWER",
    displayName: "Viewer",
    description: "Read only access",
    isSystem: true,
    sortOrder: 4,
  },
];

export const roleSeeder =
  async () => {

    for (const role of roles) {

      const exists =
        await RoleModel.findOne({
          name: role.name,
        });

      if (!exists) {
        await RoleModel.create(role);
      }
    }

    console.log(
      "Roles seeded successfully."
    );
  };