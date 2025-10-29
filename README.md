# Log Management Microservice

A system that stores metric-logs scraped by prometheus.

---

## 📘 Overview
This project was built to enable storing logs for a longer period of time for history and analysis 

---

## 🛠️ Features

- logs search — enable querying logs using parameters stated on the API docs 

---

## Tech Stack

- Expressjs
- Postgres
- Bullmq
- RabbitMq 

---

## 🚀 How to Get Started

Follow these steps to set up and run the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/Developer-s-Foundry/DF-2.0-AIMA-Log-Service

2. **navigate into the project directory**
    ```bash
    cd DF-2.0-AIMA-Log-Service

3. **install your dependencies**
    ```bash
    npm install

4. **configure your environment variable using the .env.example file as a template**
    ```bash
    cat .env.example

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
    http://localhost:port/docs


👥 Contributors

@ukasquared

@iamaamunir