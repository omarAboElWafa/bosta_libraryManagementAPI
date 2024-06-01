CREATE TABLE "books" (
  "id" serial PRIMARY KEY,
  "title" varchar(255),
  "author" varchar(255),
  "isbn" varchar(13),
  "available_quantity" integer,
  "shelf_location" varchar(50)
);

CREATE TYPE "identity_type" AS ENUM ('Admin', 'Borrower');

CREATE TABLE "identities" (
  "id" serial PRIMARY KEY,
  "name" varchar(255),
  "email" varchar(255),
  "registered_date" timestamp,
  "type" "identity_type",
  "phone" varchar(15),
  "password" varchar(255)
);

CREATE TABLE "loans" (
  "id" serial PRIMARY KEY,
  "book_id" integer,
  "identity_id" integer,
  "checkout_date" timestamp,
  "due_date" timestamp,
  "returned_date" timestamp,
  FOREIGN KEY ("book_id") REFERENCES "books" ("id"),
  FOREIGN KEY ("identity_id") REFERENCES "identities" ("id")
);
