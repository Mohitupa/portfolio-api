import app from "./app";
import config from "./config";
import connectDatabase from "./database";
import { seedAdmin } from "./seeders/admin.seed";

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    await seedAdmin();

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();