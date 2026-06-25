import { catchAsync } from "../../utils/catchAsync";
import { AdminUserService } from "./admin-user.service";

const createAdminUser =
    catchAsync(async (req, res) => {

        const result =
            await AdminUserService
                .createAdminUser(
                    req.body,
                    req.user!.userId
                );

        res.status(201).json({
            success: true,
            message:
                "Admin user created successfully",
            data: result,
        });

    });

const getAdminUsers =
    catchAsync(async (req, res) => {

        const result =
            await AdminUserService
                .getAdminUsers();

        res.status(200).json({
            success: true,
            data: result,
        });

    });

const getAdminUser =
    catchAsync(async (req, res) => {

        const result =
            await AdminUserService
                .getAdminUserById(
                    req.params.id as string
                );

        res.status(200).json({
            success: true,
            data: result,
        });

    });

const updateAdminUser =
    catchAsync(async (req, res) => {

        const result =
            await AdminUserService
                .updateAdminUser(
                    req.params.id as string,
                    req.body
                );

        res.status(200).json({
            success: true,
            message:
                "Admin user updated successfully",
            data: result,
        });

    });

const updateAdminStatus =
    catchAsync(async (req, res) => {

        const result =
            await AdminUserService
                .updateAdminStatus(
                    req.params.id as string,
                    req.body.isActive,
                    req.user!.userId
                );

        res.status(200).json({
            success: true,
            message:
                "Status updated successfully",
            data: result,
        });

    });


const changePassword =
    catchAsync(async (req, res) => {

        await AdminUserService
            .changePassword(
                req.params.id as string,
                req.body.password
            );

        res.status(200).json({
            success: true,
            message:
                "Password updated successfully",
        });

    });


const deleteAdminUser =
    catchAsync(async (req, res) => {

        await AdminUserService
            .deleteAdminUser(
                req.params.id as string,
                req.user!.userId
            );

        res.status(200).json({
            success: true,
            message:
                "Admin user deleted successfully",
        });

    });

export const AdminUserController = {
    createAdminUser,
    getAdminUsers,
    getAdminUser,
    updateAdminUser,
    updateAdminStatus,
    changePassword,
    deleteAdminUser,
};