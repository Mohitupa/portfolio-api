import { PermissionModel } from "../modules/permission/permission.model";


const permissions = [

  // Dashboard

  {
    name: "dashboard.read",
    displayName: "Dashboard Read",
    module: "Dashboard",
    action: "read",
    description: "View dashboard",
    sortOrder: 1,
    isSystem: true,
  },

  // Portfolio

  {
    name: "portfolio.read",
    displayName: "Portfolio Read",
    module: "Portfolio",
    action: "read",
    sortOrder: 1,
    isSystem: true,
  },

  {
    name: "portfolio.create",
    displayName: "Portfolio Create",
    module: "Portfolio",
    action: "create",
    sortOrder: 2,
    isSystem: true,
  },

  {
    name: "portfolio.update",
    displayName: "Portfolio Update",
    module: "Portfolio",
    action: "update",
    sortOrder: 3,
    isSystem: true,
  },

  {
    name: "portfolio.delete",
    displayName: "Portfolio Delete",
    module: "Portfolio",
    action: "delete",
    sortOrder: 4,
    isSystem: true,
  },

  {
    name: "portfolio.publish",
    displayName: "Portfolio Publish",
    module: "Portfolio",
    action: "publish",
    sortOrder: 5,
    isSystem: true,
  },

  // Media

  {
    name: "media.read",
    displayName: "Media Read",
    module: "Media",
    action: "read",
    sortOrder: 1,
    isSystem: true,
  },

  {
    name: "media.upload",
    displayName: "Media Upload",
    module: "Media",
    action: "upload",
    sortOrder: 2,
    isSystem: true,
  },

  {
    name: "media.delete",
    displayName: "Media Delete",
    module: "Media",
    action: "delete",
    sortOrder: 3,
    isSystem: true,
  },

  // Contact

  {
    name: "contact.read",
    displayName: "Contact Read",
    module: "Contact",
    action: "read",
    sortOrder: 1,
    isSystem: true,
  },

  {
    name: "contact.delete",
    displayName: "Contact Delete",
    module: "Contact",
    action: "delete",
    sortOrder: 2,
    isSystem: true,
  },

  // Admin Users

  {
    name: "admin.read",
    displayName: "Admin Read",
    module: "Admin Users",
    action: "read",
    sortOrder: 1,
    isSystem: true,
  },

  {
    name: "admin.create",
    displayName: "Admin Create",
    module: "Admin Users",
    action: "create",
    sortOrder: 2,
    isSystem: true,
  },

  {
    name: "admin.update",
    displayName: "Admin Update",
    module: "Admin Users",
    action: "update",
    sortOrder: 3,
    isSystem: true,
  },

  {
    name: "admin.delete",
    displayName: "Admin Delete",
    module: "Admin Users",
    action: "delete",
    sortOrder: 4,
    isSystem: true,
  },

  // Roles

  {
    name: "role.manage",
    displayName: "Role Management",
    module: "Roles",
    action: "manage",
    sortOrder: 1,
    isSystem: true,
  },

  // Permissions

  {
    name: "permission.manage",
    displayName: "Permission Management",
    module: "Permissions",
    action: "manage",
    sortOrder: 1,
    isSystem: true,
  },

  // Settings

  {
    name: "settings.update",
    displayName: "Settings Update",
    module: "Settings",
    action: "update",
    sortOrder: 1,
    isSystem: true,
  },
];

export const permissionSeeder =
  async () => {

    for (const permission of permissions) {

      const exists =
        await PermissionModel.findOne({
          name: permission.name,
        });

      if (!exists) {
        await PermissionModel.create(
          permission
        );
      }
    }

    console.log(
      "Permissions seeded successfully."
    );
  };