# Metrics Management Microservice

This is a metrics management service that stores metrics scraped by prometheus based on the services its monitoring, filters, query prometheus and distributed a formatted data to a message broker.

---

## 📘 Overview
This project was built to enable storing metrics scraped by prometheus based on the services its monitoring. It filters, query prometheus and distributed a formatted data to a message broker.

---

## 🛠️ Features

- metrics search — enable querying logs using parameters stated on the API docs 

---

## Tech Stack

- Expressjs
- Postgres
- Bullmq
- RabbitMq
- node_cron

---

## Application flow
- Consumes data published by rabbitmq
- Cron job fetches data every minute from the database and adds to a queue
- Hosted prometheus url of user is extracted from each data on the queue
- Prometheus url is queried for sets of metrics and data around it
- Metric data is stored in database as well as published to rabbitmq

## 🚀 How to Get Started

Follow these steps to set up and run the project locally:

1. **Clone the repository**
   ```bash
   https://github.com/Developer-s-Foundry/DF-2.0-AIMA-Metrics-Service

2. **navigate into the project directory**
    ```bash
    cd DF-2.0-AIMA-Metrics-Service

3. **install your dependencies**
    ```bash
    npm install

4. **configure your environment variable using the .env.example file as a template**
    ```bash
    copy .env.example into .env

5. **generate your migrations**
    ```bash
    npm run typeorm:migration

6.  **run your migrations**
    ```bash
    npm run migration:run:dev

7. **start the dev server**
    ```bash
    npm run dev

8. **go to url/docs to view API docs**
    ```bash
    http://localhost:port-number/docs


---

## 👥 Contributors

[@ukasquared](https://github.com/ukasquared)


[@iamaamunir](https://github.com/iamaamunir)