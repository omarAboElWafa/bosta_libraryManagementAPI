import { MigrationBuilder } from 'node-pg-migrate';

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable('books', {
    id: 'serial PRIMARY KEY',
    title: { type: 'varchar(255)', notNull: true },
    author: { type: 'varchar(255)', notNull: true },
    isbn: { type: 'varchar(13)', notNull: true },
    available_quantity: { type: 'integer', notNull: true },
    shelf_location: { type: 'varchar(50)', notNull: true },
  });

  pgm.createType('identity_type', ['Admin', 'Borrower']);

  pgm.createTable('identities', {
    id: 'serial PRIMARY KEY',
    name: { type: 'varchar(255)', notNull: true },
    email: { type: 'varchar(255)', notNull: true },
    registered_date: { type: 'timestamp', notNull: true },
    type: { type: 'identity_type', notNull: true },
    phone: { type: 'varchar(15)', notNull: true },
    password: { type: 'varchar(255)', notNull: true },
  });

  pgm.createTable('loans', {
    id: 'serial PRIMARY KEY',
    book_id: { type: 'integer', notNull: true, references: 'books(id)' },
    identity_id: { type: 'integer', notNull: true, references: 'identities(id)' },
    checkout_date: { type: 'timestamp', notNull: true },
    due_date: { type: 'timestamp', notNull: true },
    returned_date: { type: 'timestamp' },
  });
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable('loans');
  pgm.dropTable('identities');
  pgm.dropType('identity_type');
  pgm.dropTable('books');
};