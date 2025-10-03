import expressConfig from "./common/config/express";
import { APP_CONFIGS } from "./common/config/index";
import express from "express";
import { dbInitialization } from "./common/config/database";

(async () => {
  const app: express.Application = express();
  expressConfig(app);
  await dbInitialization();

  app.listen(APP_CONFIGS.SERVER_PORT, () => {
    console.log(`Server running on port ${APP_CONFIGS.SERVER_PORT}`);
  });
})();
