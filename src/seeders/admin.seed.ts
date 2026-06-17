import bcrypt from "bcrypt";
import { AdminUserModel } from "../modules/admin-user/admin-user.model";

export const seedAdmin = async () => {
  try {
    const existingAdmin =
      await AdminUserModel.findOne({
        email: "admin@portfolio.com",
      });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword =
      await bcrypt.hash("Admin@123", 10);

    await AdminUserModel.create({
      name: "Super Admin",
      email: "admin@portfolio.com",
      password: hashedPassword,
      role: "SUPER_ADMIN",
      isActive: true,
    });

    console.log("Admin seeded successfully");
  } catch (error) {
    console.error("Admin seed failed", error);
  }
};