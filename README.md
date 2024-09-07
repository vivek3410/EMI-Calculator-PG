# Project Name

## Overview

This project implements an EMI (Equated Monthly Installment) calculator with Sequelize ORM and PostgreSQL. The application calculates EMI payments, handles prepayments, and provides a month-wise breakdown of payments.

## Table of Contents

- [Project Setup](#project-setup)
- [Project Structure](#Project-Structure)
- [CLI Commands](#cli-commnands)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [JSON-Responses](#json-responses)

## Project Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/username/repository.git
   cd repository
   ```
2. Install Dependencies
   Ensure you have Node.js installed. Install the required packages using npm:
   ```bash
   npm install
   ```
3. Configure the Database:
   Update the config/config.json file with your PostgreSQL database credentials.
  ```bash
 {
    "development": {
      "username": "your-username",
      "password": "your-password",
      "database": "emi",
      "host": "127.0.0.1",
      "dialect": "postgres"
    }
}
   ```
4. Initialize Sequelize:
   Initialize Sequelize in the project directory to set up the migration and model structure:
   ```bash
   npx sequelize-cli init
   ```
5. Run Migrations:
   Create the necessary tables in the database:
    ```bash
   npx sequelize-cli db:migrate
   ```
# Project Structure
* ```models/```: Contains Sequelize model definitions.
* ```migrations/ ```: Contains Sequelize migration files.
* ```controllers/```: Contains logic for handling API requests.
* ```config/```: Contains database configuration files.
* ```routes/```: Contains API route definitions.
* ```index.js```: Entry point for the application.

# CLI Commands
1. Initialize Sequelize:
   ```bash
   npx sequelize-cli init
   ```
2. Create a New Migration:
    ```bash
   npx sequelize-cli migration:generate --name migration-name
   ```
3. Run Migrations:
    ```bash
    npx sequelize-cli db:migrate
   ```
4. Undo Last Migration:
    ```bash
   npx sequelize-cli db:migrate:undo
   ```
5. Generate a New Model:
    ```bash
   npx sequelize-cli migration:generate --name migration-name
   ```
6. Generate a New Seed File:
    ```bash
   npx sequelize-cli seed:generate --name seedName
   ```
7. Run All Seed Files:
    ```bash
   npx sequelize-cli db:seed:all
   ```
8. Start Development Server with Nodemon:
    ```bash
   npm run dev
   ```
# Script Commands
Here are the script commands defined in ```package.json```:

* Generate EMI Model:
    ```bash
   npm run make-model:emi
   ```
* Generate Seed File:
    ```bash
   npm run make:seed
   ```
* Run All Seed Files:
    ```bash
   npm run seed:all
   ```
* Run Migrations:
    ```bash
   npm run migrate
   ```
* Undo Last Migration:
    ```bash
   npm run migrate:down
   ```
* Start Development Server with Nodemon:
    ```bash
   npm run dev
   ```

# API Endpoints
##### CREATING EMI Payments
##### **Endpoint:** ```POST /calculate-emi```
### **Description:** Create EMI payments.


Response:
  ```bash
{
    {
    "status": 200,
    "message": "Successfully Retrived.",
    "data": {
        "id": "a66407c1-6cc0-4fed-84d3-2f0110748092",
        "loanAmount": "500000",
        "interestRate": "8.5",
        "loanTenureMonths": 58,
        "emi": "10258.27",
        "prepayment": "20000",
        "monthWisePayments": [
            {
                "month": 1,
                "emi_paid": "10258.27",
                "interest_paid": "3541.67",
                "principal_paid": "6716.60",
                "prepayment": "20000.00",
                "remaining_balance": "473283.40"
            },
            {
                "month": 2,
                "emi_paid": "10258.27",
                "interest_paid": "3352.42",
                "principal_paid": "6905.85",
                "prepayment": "0.00",
                "remaining_balance": "466377.55"
            },
            ...
        ]
    }
  }
}
 ```

### Fetch All EMI Payments
##### **Endpoint:** ```GET /emi-payments```
##### **Description:** Retrieves all EMI payments and details.
Response:
  ```bash
{
    "status": 201,
    "message": "New Record Created",
    "data": [
        {
            "emi_details": {
                "id": "a66407c1-6cc0-4fed-84d3-2f0110748092",
                "loan_amount": "500000",
                "interest_rate": "8.5",
                "loan_tenure_months": 58,
                "emi": "10258.27",
                "prepayment_amount": "20000"
            },
            "month_wise_payment": {
                "month": 1,
                "emi_paid": "10258.27",
                "interest_paid": "3541.67",
                "principal_paid": "6716.60",
                "prepayment": "20000.00",
                "remaining_balance": "473283.40"
            }
        },
        {
            "emi_details": {
                "id": "a66407c1-6cc0-4fed-84d3-2f0110748092",
                "loan_amount": "500000",
                "interest_rate": "8.5",
                "loan_tenure_months": 58,
                "emi": "10258.27",
                "prepayment_amount": "20000"
            },
            "month_wise_payment": {
                "month": 2,
                "emi_paid": "10258.27",
                "interest_paid": "3352.42",
                "principal_paid": "6905.85",
                "prepayment": "0.00",
                "remaining_balance": "466377.55"
            }
        },
        {
            "emi_details": {
                "id": "a66407c1-6cc0-4fed-84d3-2f0110748092",
                "loan_amount": "500000",
                "interest_rate": "8.5",
                "loan_tenure_months": 58,
                "emi": "10258.27",
                "prepayment_amount": "20000"
            },
            "month_wise_payment": {
                "month": 3,
                "emi_paid": "10258.27",
                "interest_paid": "3303.51",
                "principal_paid": "6954.76",
                "prepayment": "0.00",
                "remaining_balance": "459422.79"
            }
        },
        ...
    ]
}
 ```

# Database Schema
### ```emi_details``` Table
* ```id```: UUID, Primary Key,
* ```loan_amount```: DECIMAL
* ```interest_rate```: DECIMAL
* ```loan_tenure_months```: DECIMAL
* ```emi```: DECIMAL
* ```prepayment_amount```: DECIMAL

### ```month_wise_payments``` Table
* ```id```: UUID, Primary Key,
* ```emi_details_id```: UUID, Foreign Key to ```emi_details.id```
* ```month```: DECIMAL
* ```interest_paid```: DECIMAL
* ```principal_paid```: DECIMAL
* ```prepayment```: DECIMAL
* ```remaining_balance```: DECIMAL

# JSON Responses

### Example Response for Fetching EMI Payments by ID

```bash
{
    {
    "status": 200,
    "message": "Successfully Retrived.",
    "data": {
        "id": "a66407c1-6cc0-4fed-84d3-2f0110748092",
        "loanAmount": "500000",
        "interestRate": "8.5",
        "loanTenureMonths": 58,
        "emi": "10258.27",
        "prepayment": "20000",
        "monthWisePayments": [
            {
                "month": 1,
                "emi_paid": "10258.27",
                "interest_paid": "3541.67",
                "principal_paid": "6716.60",
                "prepayment": "20000.00",
                "remaining_balance": "473283.40"
            },
            {
                "month": 2,
                "emi_paid": "10258.27",
                "interest_paid": "3352.42",
                "principal_paid": "6905.85",
                "prepayment": "0.00",
                "remaining_balance": "466377.55"
            },
            ...
        ]
    }
}
}
```























    
