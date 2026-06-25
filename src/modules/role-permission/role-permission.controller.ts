import { catchAsync } from "../../utils/catchAsync";
import { RolePermissionService } from "./role-permission.service";

const assignPermissions =
  catchAsync(async (req, res) => {

    const result =
      await RolePermissionService.assignPermissionsToRole(
        req.params.roleId as string,
        req.body.permissionIds
      );

    res.status(200).json({
      success: true,
      message:
        "Permissions assigned successfully",
      data: result,
    });
  });

const getRolePermissions =
  catchAsync(async (req, res) => {

    const result =
      await RolePermissionService.getRolePermissions(
        req.params.roleId as string
      );

    res.status(200).json({
      success: true,
      data: result,
    });
  });

export const RolePermissionController = {
  assignPermissions,
  getRolePermissions,
};