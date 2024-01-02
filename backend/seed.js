/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    // Optional: Truncate tables (remove existing data)
    // await database.query("truncate borne");

    // Insert fake data into the 'item' table

    queries.push(
      database.query(
        `LOAD DATA INFILE ? INTO TABLE ${this.table} FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES ERMINATED BY '\n' IGNORE 1 LINES`,
        [
          `C:\\Users\\morga\\P3\\geo-code\\backend\\public\\uploads\\f464ae4c3b280cbcc8edccbed3168860-csv.csv`,
        ]
      )
    );

    /* ************************************************************************* */

    // Wait for all the insertion queries to complete
    await Promise.all(queries);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
