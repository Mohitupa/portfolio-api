import { catchAsync } from "../../utils/catchAsync";
import { UserRoleService } from "./user-role.service";

const assignRoles =
  catchAsync(async (req, res) => {

    const result =
      await UserRoleService.assignRolesToUser(
        req.params.userId as string,
        req.body.roleIds
      );

    res.status(200).json({
      success: true,
      message:
        "Roles assigned successfully",
      data: result,
    });
  });

const getUserRoles =
  catchAsync(async (req, res) => {

    const result =
      await UserRoleService.getUserRoles(
        req.params.userId as string
      );

    res.status(200).json({
      success: true,
      data: result,
    });
  });

export const UserRoleController = {
  assignRoles,
  getUserRoles,
};