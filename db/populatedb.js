#! /usr/bin/env node
const { Client } = require("pg");

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const manufacturersSQL = `
INSERT INTO manufacturers (name)
VALUES
  ('Blackriver'),
  ('Flatface'),
  ('Berlinwood'),
  ('Bollie');
`;

const args = process.argv.slice(2); // Remove the first two elements (node and script paths)

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_PUBLIC_URL,
  });
  const tableName = args[0]; // Access the first argument
  console.log(`Populating table: ${tableName}`);
  await client.connect();
  await client.query(manufacturersSQL);
  await client.end();
  console.log("done");
}

main();
