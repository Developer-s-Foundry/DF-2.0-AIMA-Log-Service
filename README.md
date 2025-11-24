# Metrics Management Microservice
<p style="font-family: Verdana; font-size: 18px;">
This is a metrics management service that stores metrics scraped by prometheus based on the services its monitoring, filters, query prometheus and distributed a formatted data to a message broker.</p>

---

## 📘 Overview
<p style="font-family: Verdana; font-size: 18px;">
This project was built to enable storing metrics scraped by prometheus based on the services its monitoring. It filters, query prometheus and distributed a formatted data to a message broker.</p>

---

## 🛠️ Features

<p style="font-family: Verdana; font-size: 18px;">
Metrics search — enable querying metrics using parameters stated on the API docs </p>

---

## Tech Stack
<p style="font-family: Verdana; font-size: 18px;">
<li style="font-family: Verdana; font-size: 18px;">Expressjs</li>
<li style="font-family: Verdana; font-size: 18px;"> Postgres</li>
<li style="font-family: Verdana; font-size: 18px;">Bullmq</li>
<li style="font-family: Verdana; font-size: 18px;">RabbitMq</li>
<li style="font-family: Verdana; font-size: 18px;">node_cron</li>
</p>

---

## Application flow
<p style="font-family: Verdana; font-size: 18px;">
1. Consumes data published by rabbitmq
</p>
<p style="font-family: Verdana; font-size: 18px;">
2. Cron job fetches data every minute from the database and adds to a queue</p>

<p style="font-family: Verdana; font-size: 18px;">
3. Hosted prometheus url of user is extracted from each data on the queue</p>

<p style="font-family: Verdana; font-size: 18px;">
4. Prometheus url is queried for sets of metrics and the data around it</p>

<p style="font-family: Verdana; font-size: 18px;">
5. Metric data is stored in database as well as published to rabbitmq for consumption by other Microservices</p>


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