import { PermissionModel } from "./permission.model";

const createPermission = async (payload: any) => {

  const exists = await PermissionModel.findOne({
    name: payload.name,
  });

  if (exists) {
    throw new Error("Permission already exists");
  }

  return PermissionModel.create(payload);
};

const getPermissions = async () => {

  return PermissionModel
    .find()
    .sort({
      module: 1,
      sortOrder: 1,
      displayName: 1,
    });
};

const getPermissionById = async (
  id: string
) => {

  const permission =
    await PermissionModel.findById(id);

  if (!permission) {
    throw new Error("Permission not found");
  }

  return permission;
};

const updatePermission = async (
  id: string,
  payload: any
) => {

  const permission =
    await PermissionModel.findById(id);

  if (!permission) {
    throw new Error("Permission not found");
  }

  return PermissionModel.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deletePermission = async (
  id: string
) => {

  const permission =
    await PermissionModel.findById(id);

  if (!permission) {
    throw new Error("Permission not found");
  }

  if (permission.isSystem) {
    throw new Error(
      "System permissions cannot be deleted"
    );
  }

  await PermissionModel.findByIdAndDelete(
    id
  );

  return null;
};

export const PermissionService = {
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
};