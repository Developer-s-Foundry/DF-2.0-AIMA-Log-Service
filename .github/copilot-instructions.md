# Copilot / AI Agent Instructions — DF-2.0-AIMA-Log-Service

Purpose
- Quick summary: this service scrapes/prometheus-derived metrics, persists them, and publishes formatted metric data to RabbitMQ for downstream consumers.

Big picture architecture
- Express API (`src/server.ts`) hosts Swagger docs and routes (`/docs`) and starts background processes on server start: `consumeProjectMessages()`, `ProjectJob()` (cron), and `projectWorker()` (BullMQ worker).
- Message ingestion: RabbitMQ consumer `src/broker/consumers/project_consumer.ts` listens on `projects_queue` and syncs Projects into the DB via `ProjectRepository`.
- Scheduling: `src/crons/metric_cron_job.ts` reads projects from the DB and enqueues jobs in BullMQ (`src/queue/queue.ts`) using `APP_CONFIGS.JOB_NAME`.
- Processing: `src/worker/project_worker.ts` is a BullMQ Worker that queries Prometheus endpoints (job.data.prometheus_metric_url), persists each metric via `MetricRepo.createMetric`, and publishes notifications via `src/broker/producers/producer.ts` (RabbitMQ).
- Storage & models: TypeORM (`src/common/config/database.ts`, `src/models/entities/*`) stores metrics and projects.

Where to look (key files)
- Startup: `src/server.ts` — initializes DB, Swagger, middleware, and starts consumers/cron/workers.
- RMQ consumer: `src/broker/consumers/project_consumer.ts` — handles `PROJECT_CREATED`, `PROJECT_UPDATED`, `PROJECT_DELETED`.
- RMQ producer: `src/broker/producers/producer.ts` — `PubToNotification()` and `publishMsg()` define how messages are published and exchanges/queues are asserted.
- Worker: `src/worker/project_worker.ts` — main metric collection, formatting, persistence and publish flow.
- Cron: `src/crons/metric_cron_job.ts` — schedules job enqueues (cron expression `*/5 * * * *` in code).
- Queue helpers: `src/queue/queue.ts` — BullMQ queue and graceful drain (`clearQueueOnShutdown`).
- Repositories: `src/repositories/*` — DB access patterns; `MetricRepo` shows date-range queries and creation logic.
- Configs: `src/common/config/*` — `database.ts`, `rabbitmq.ts`, `bullmq.ts`, `express.ts` hold environment-driven configuration.

Project-specific conventions & patterns
- Repositories: classes named `*Repo` in `src/repositories` and constructed directly where needed.
- App-wide configs live behind `APP_CONFIGS` in `src/common/config/index` — use these values for queue names and ports.
- Queue naming: BullMQ queue name and RabbitMQ queue names are defined in `APP_CONFIGS` (e.g., `QUEUE_NAME`, `QUEUE_NAME_RMQ`, `QUEUE_NAME_RMQ_2`). Avoid hardcoding names.
- Worker payload: Bull job expects `job.data` with `id` (project id) and `prometheus_metric_url`. See `project_worker.ts`.
- Publishing: Two styles used — direct publish to a queue (`PubToNotification`) and publishing to an exchange then binding queues (`publishMsg`).

Important commands & workflows
- Install: `npm install`
- Dev server (generates tsoa routes + watches): `npm run dev` (internally runs `tsoa spec-and-routes` then `nodemon`).
- Generate migration: `npm run typeorm:migration` (uses `ts-node` TypeORM CLI)
- Run migrations (dev): `npm run migration:run:dev`
- Run RabbitMQ consumer entry (dev): `npm run rabbit-server`
- Start worker entries (dev): `npm run start:worker:dev` or `npm run prometheus:worker:dev`
- Build: `npm run build` (generates typings/routes + `tsc`)
- Start production: `npm start` (runs `node dist/server.js`)

Environment & external dependencies
- External services required while developing/running:
  - Postgres (TypeORM) — DB referenced by `src/common/config/database.ts`.
  - Redis — BullMQ connection (`src/common/config/bullmq.ts`).
  - RabbitMQ — amqplib usage in `src/common/config/rabbitmq.ts` and `src/broker/*`.
  - Prometheus endpoints — runtime external APIs queried by worker.
- Use `.env` (copy from `.env.example`) to configure connection strings and `APP_CONFIGS` values.

Debugging tips & gotchas discovered in code
- Server start sequence: `src/server.ts` calls `consumeProjectMessages()`, `ProjectJob()`, and `projectWorker()` after `app.listen` — check logs to confirm each started.
- Consumer ack: `channel.ack(msg)` is commented out in `project_consumer.ts` — this may lead to re-delivery; be cautious when testing message consumption.
- Cron frequency mismatch: README mentions "every minute" but cron expression in `metric_cron_job.ts` is `*/5 * * * *` (every 5 minutes). Trust the code.
- Graceful shutdown: `clearQueueOnShutdown()` in `src/queue/queue.ts` drains and cleans Bull queues on `SIGINT`/`SIGTERM`.
- Long-running workers: Worker uses asynchronous operations inside `for` loops and `forEach` with async callbacks; expect concurrency and ordering differences. Prefer checking `project_worker.ts` when debugging missing metrics.

Examples (common dev tasks)
- Start full dev stack (Postgres, Redis, RabbitMQ) then:
  - `npm run dev` — starts Express server and route generation.
  - In separate terminal: `npm run start:worker:dev` to run worker entry points if not started by server.
  - Verify: visit `http://localhost:<PORT>/docs` for Swagger.
- Add a project message test: publish a JSON message with `event_type: PROJECT_CREATED` to `projects_queue` (RabbitMQ) to exercise `project_consumer.ts`.

When editing code
- Update `src/swagger/routes.ts` and run `npm run dev` or `npm run build` to regenerate OpenAPI routes via `tsoa`.
- Respect `APP_CONFIGS` for names and ports. Changing queue names requires updating both producer and consumer code or APP_CONFIGS.

If unsure where to change behavior
- For ingestion behavior: inspect `src/broker/consumers/project_consumer.ts`.
- For metric collection flow: inspect `src/worker/project_worker.ts` and helpers in `src/common/utils/helper_func.ts`.
- For DB shape and migrations: inspect `src/models/entities/*` and `src/common/config/database.ts`.

Questions I might ask you
- Which environment variables should be considered secrets vs. defaults for local dev?
- Do you want strict message ack semantics (ack/nack) in consumers or is replay acceptable?

End of file — please review and tell me what to expand or correct (examples, missing files, or operational steps to include).