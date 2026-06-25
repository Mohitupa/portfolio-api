import { catchAsync } from "../../utils/catchAsync";
import { PermissionService } from "./permission.service";

const createPermission =
  catchAsync(async (req, res) => {

    const result =
      await PermissionService.createPermission(
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Permission created successfully",
      data: result,
    });
  });

const getPermissions =
  catchAsync(async (_req, res) => {

    const result =
      await PermissionService.getPermissions();

    res.status(200).json({
      success: true,
      data: result,
    });
  });

const getPermission =
  catchAsync(async (req, res) => {

    const result =
      await PermissionService.getPermissionById(
        req.params.id as string
      );

    res.status(200).json({
      success: true,
      data: result,
    });
  });

const updatePermission =
  catchAsync(async (req, res) => {

    const result =
      await PermissionService.updatePermission(
        req.params.id as string,
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Permission updated successfully",
      data: result,
    });
  });

const deletePermission =
  catchAsync(async (req, res) => {

    await PermissionService.deletePermission(
      req.params.id as string
    );

    res.status(200).json({
      success: true,
      message:
        "Permission deleted successfully",
    });
  });

export const PermissionController = {
  createPermission,
  getPermissions,
  getPermission,
  updatePermission,
  deletePermission,
};