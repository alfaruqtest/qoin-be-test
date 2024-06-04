# Qoin Backend Test NodeJs

## Setup and Usage

### Step 1: Clone the Repository

```sh
git@github.com:alfaruqtest/qoin-be-test.git
cd qoin-be-test
```

### Step 2: Run the MariaDB and RabbitMQ Containers

```sh
docker compose up
```

## Run the Task 1

```sh
cd task1
pnpm run start
```

## Run the Task 2 and 3

```sh
cd task23/consumer
pnpm run start

cd task23/producer
pnpm run start
```
