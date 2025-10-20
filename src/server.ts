import expressConfig from "./common/config/express";
import { APP_CONFIGS } from "./common/config/index";
import express from "express";
import { dbInitialization } from "./common/config/database";
import { logMiddleware } from "./Middleware/log_middleware";
import { workerSystem } from "./worker/worker";
import { consumeMsg } from "./broker/consumer";


(async () => {
  const app: express.Application = express();
  expressConfig(app);
  await dbInitialization();

  // app.use(logMiddleware)

  app.listen(APP_CONFIGS.SERVER_PORT, async () => {
    console.log(`Server running on port ${APP_CONFIGS.SERVER_PORT}`);
    await workerSystem();
    await consumeMsg()
  });
})();
