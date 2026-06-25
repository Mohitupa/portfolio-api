import app from "./app";
import config from "./config";
import connectDatabase from "./database";
import { seedAdmin } from "./seeders/admin.seed";
import { permissionSeeder } from "./seeders/permission.seed";
import { roleSeeder } from "./seeders/role.seed";
import { userRoleSeeder } from "./seeders/user-role.seed";

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    await seedAdmin();
    await permissionSeeder();
    await roleSeeder();
    await userRoleSeeder();

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();