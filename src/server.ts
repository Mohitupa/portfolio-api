import app from "./app";
import config from "./config";
import connectDatabase from "./database";

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();