import expressConfig from "./common/config/express";
import { APP_CONFIGS } from "./common/config/index";
import express, { Response as ExResponse, Request as ExRequest } from "express";
import { dbInitialization } from "./common/config/database";
import { RegisterRoutes } from './swagger/routes'
import swaggerUi from "swagger-ui-express";
import { logMiddleware } from "./Middleware/metric_middleware";
import { ProjectJob } from "./crons/metric_cron_job";
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
    // await ProjectJob();
    // await projectWorker();
  });
})();
