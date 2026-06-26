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
  {
    name: "portfolio.unpublish",
    displayName: "Portfolio Unpublish",
    module: "Portfolio",
    action: "unpublish",
    sortOrder: 6,
    isSystem: true,
  },
  {
    name: "portfolio.status",
    displayName: "Portfolio Status",
    module: "Portfolio",
    action: "status",
    sortOrder: 7,
    isSystem: true,
  },

  // Portfolio Content

  {
    name: "portfolio-content.read",
    displayName: "Portfolio Content Read",
    module: "Portfolio Content",
    action: "read",
    sortOrder: 1,
    isSystem: true,
  },
  {
    name: "portfolio-content.create",
    displayName: "Portfolio Content Create",
    module: "Portfolio Content",
    action: "create",
    sortOrder: 2,
    isSystem: true,
  },
  {
    name: "portfolio-content.update",
    displayName: "Portfolio Content Update",
    module: "Portfolio Content",
    action: "update",
    sortOrder: 3,
    isSystem: true,
  },
  {
    name: "portfolio-content.publish",
    displayName: "Portfolio Content Publish",
    module: "Portfolio Content",
    action: "publish",
    sortOrder: 4,
    isSystem: true,
  },
  {
    name: "portfolio-content.unpublish",
    displayName: "Portfolio Content Unpublish",
    module: "Portfolio Content",
    action: "unpublish",
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
    name: "contact.update",
    displayName: "Contact Update",
    module: "Contact",
    action: "update",
    sortOrder: 2,
    isSystem: true,
  },
  {
    name: "contact.delete",
    displayName: "Contact Delete",
    module: "Contact",
    action: "delete",
    sortOrder: 3,
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
    name: "admin.status",
    displayName: "Admin Status",
    module: "Admin Users",
    action: "status",
    sortOrder: 4,
    isSystem: true,
  },
  {
    name: "admin.password",
    displayName: "Admin Password",
    module: "Admin Users",
    action: "password",
    sortOrder: 5,
    isSystem: true,
  },
  {
    name: "admin.delete",
    displayName: "Admin Delete",
    module: "Admin Users",
    action: "delete",
    sortOrder: 6,
    isSystem: true,
  },

  // Roles

  {
    name: "role.read",
    displayName: "Role Read",
    module: "Roles",
    action: "read",
    sortOrder: 1,
    isSystem: true,
  },
  {
    name: "role.create",
    displayName: "Role Create",
    module: "Roles",
    action: "create",
    sortOrder: 2,
    isSystem: true,
  },
  {
    name: "role.update",
    displayName: "Role Update",
    module: "Roles",
    action: "update",
    sortOrder: 3,
    isSystem: true,
  },
  {
    name: "role.delete",
    displayName: "Role Delete",
    module: "Roles",
    action: "delete",
    sortOrder: 4,
    isSystem: true,
  },

  // Permissions

  {
    name: "permission.read",
    displayName: "Permission Read",
    module: "Permissions",
    action: "read",
    sortOrder: 1,
    isSystem: true,
  },
  {
    name: "permission.create",
    displayName: "Permission Create",
    module: "Permissions",
    action: "create",
    sortOrder: 2,
    isSystem: true,
  },
  {
    name: "permission.update",
    displayName: "Permission Update",
    module: "Permissions",
    action: "update",
    sortOrder: 3,
    isSystem: true,
  },
  {
    name: "permission.delete",
    displayName: "Permission Delete",
    module: "Permissions",
    action: "delete",
    sortOrder: 4,
    isSystem: true,
  },

  // Role Permission

  {
    name: "role-permission.read",
    displayName: "Role Permission Read",
    module: "Role Permissions",
    action: "read",
    sortOrder: 1,
    isSystem: true,
  },
  {
    name: "role-permission.update",
    displayName: "Role Permission Update",
    module: "Role Permissions",
    action: "update",
    sortOrder: 2,
    isSystem: true,
  },

  // User Role

  {
    name: "user-role.read",
    displayName: "User Role Read",
    module: "User Roles",
    action: "read",
    sortOrder: 1,
    isSystem: true,
  },
  {
    name: "user-role.update",
    displayName: "User Role Update",
    module: "User Roles",
    action: "update",
    sortOrder: 2,
    isSystem: true,
  },

  // Settings

  {
    name: "settings.read",
    displayName: "Settings Read",
    module: "Settings",
    action: "read",
    sortOrder: 1,
    isSystem: true,
  },
  {
    name: "settings.update",
    displayName: "Settings Update",
    module: "Settings",
    action: "update",
    sortOrder: 2,
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