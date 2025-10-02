import expressConfig from "./common/config/express";
import { APP_CONFIGS } from "./common/config/index";
import express from "express";

(async () => {
  const app: express.Application = express();
  expressConfig(app);

  app.listen(APP_CONFIGS.SERVER_PORT, () => {
    console.log(`Server running on port ${APP_CONFIGS.SERVER_PORT}`);
  });
})();
