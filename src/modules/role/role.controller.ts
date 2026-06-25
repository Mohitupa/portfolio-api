import { catchAsync } from "../../utils/catchAsync";
import { RoleService } from "./role.service";

const createRole =
  catchAsync(async (req, res) => {

    const result =
      await RoleService.createRole(
        req.body
      );

    res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: result,
    });
  });

const getRoles =
  catchAsync(async (_req, res) => {

    const result =
      await RoleService.getRoles();

    res.status(200).json({
      success: true,
      data: result,
    });
  });

const getRole =
  catchAsync(async (req, res) => {

    const result =
      await RoleService.getRole(
        req.params.id as  string
      );

    res.status(200).json({
      success: true,
      data: result,
    });
  });

const updateRole =
  catchAsync(async (req, res) => {

    const result =
      await RoleService.updateRole(
        req.params.id as  string,
        req.body
      );

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      data: result,
    });
  });

const deleteRole =
  catchAsync(async (req, res) => {

    await RoleService.deleteRole(
      req.params.id as  string
    );

    res.status(200).json({
      success: true,
      message: "Role deleted successfully",
    });
  });

export const RoleController = {
  createRole,
  getRoles,
  getRole,
  updateRole,
  deleteRole,
};