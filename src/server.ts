import expressConfig from "./common/config/express";
import { APP_CONFIGS } from "./common/config/index";
import express, { Response as ExResponse, Request as ExRequest } from "express";
import { dbInitialization } from "./common/config/database";
// import { workerSystem } from "./worker/log_worker";
// import { consumeMsg } from "./broker/consumers/prom_data_consumer";
import { RegisterRoutes } from './swagger/routes'
import swaggerUi from "swagger-ui-express";
import { logMiddleware } from "./Middleware/log_middleware";
// import { consumeProjectMessages } from "./broker/consumers/project_consumer";
import { ProjectJob } from "./crons/log_cron_job";
import { projectWorker } from "./worker/project_worker";



(async () => {
  const app: express.Application = express();
  expressConfig(app);
  await dbInitialization();

  app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    return res.send(
      swaggerUi.generateHTML(await import("./swagger/swagger.json"))
    );
  });
  
  app.use('/logs', logMiddleware)

  RegisterRoutes(app)

  app.listen(APP_CONFIGS.SERVER_PORT, async () => {
    console.log(`Server running on port ${APP_CONFIGS.SERVER_PORT}`);
    // await consumeProjectMessages();
    await ProjectJob();
    await projectWorker();
  });
})();
