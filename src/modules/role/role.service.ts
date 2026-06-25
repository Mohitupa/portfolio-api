import { RoleModel } from "./role.model";

const createRole = async (
  payload: any
) => {

  const exists =
    await RoleModel.findOne({
      name: payload.name,
    });

  if (exists) {
    throw new Error(
      "Role already exists"
    );
  }

  return RoleModel.create(payload);
};

const getRoles = async () => {

  return RoleModel
    .find()
    .sort({
      sortOrder: 1,
      displayName: 1,
    });
};

const getRole = async (
  id: string
) => {

  const role =
    await RoleModel.findById(id);

  if (!role) {
    throw new Error(
      "Role not found"
    );
  }

  return role;
};

const updateRole = async (
  id: string,
  payload: any
) => {

  const role =
    await RoleModel.findById(id);

  if (!role) {
    throw new Error(
      "Role not found"
    );
  }

  return RoleModel.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteRole = async (
  id: string
) => {

  const role =
    await RoleModel.findById(id);

  if (!role) {
    throw new Error(
      "Role not found"
    );
  }

  if (role.isSystem) {
    throw new Error(
      "System role cannot be deleted"
    );
  }

  await RoleModel.findByIdAndDelete(id);

  return null;
};

export const RoleService = {
  createRole,
  getRoles,
  getRole,
  updateRole,
  deleteRole,
};