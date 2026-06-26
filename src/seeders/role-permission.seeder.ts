import { PermissionModel } from "../modules/permission/permission.model";
import { RoleModel } from "../modules/role/role.model";
import { RolePermissionModel } from "../modules/role-permission/role-permission.model";

export const rolePermissionSeeder = async () => {

    const superAdmin =
        await RoleModel.findOne({
            name: "SUPER_ADMIN",
        });

    const admin =
        await RoleModel.findOne({
            name: "ADMIN",
        });

    const permissions =
        await PermissionModel.find();

    if (!superAdmin || !admin) {
        throw new Error(
            "Roles not found"
        );
    }

    // Remove old mappings
    await RolePermissionModel.deleteMany({});

    // SUPER_ADMIN gets ALL permissions
    const superAdminPermissions =
        permissions.map(permission => ({
            roleId: superAdmin._id,
            permissionId: permission._id,
        }));

    // ADMIN permissions
    const adminPermissionKeys = [

        "dashboard.read",

        "portfolio.read",
        "portfolio.create",
        "portfolio.update",
        "portfolio.publish",

        "portfolio-content.read",
        "portfolio-content.create",
        "portfolio-content.update",
        "portfolio-content.publish",

        "media.read",
        "media.upload",
        "media.delete",

        "contact.read",
        "contact.update",

        "admin.read",

        "settings.read",
        "settings.update",
    ];

    const adminPermissions =
        permissions
            .filter(permission =>
                adminPermissionKeys.includes(
                    permission.name
                )
            )
            .map(permission => ({
                roleId: admin._id,
                permissionId: permission._id,
            }));

    await RolePermissionModel.insertMany([
        ...superAdminPermissions,
        ...adminPermissions,
    ]);

    console.log(
        "Role permissions seeded successfully."
    );
};