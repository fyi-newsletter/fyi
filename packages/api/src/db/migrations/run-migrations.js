// dist/db/migrations/migrationRunner.js
const { DataSource } = require('typeorm');
const config = require('../../typeorm.config.js'); // path to your compiled TS config

const dataSource = new DataSource(config);

async function runMigrations() {
  try {
    await dataSource.initialize();
    console.log('Database initialized.');

    await dataSource.runMigrations();
    console.log('Migrations completed.');

    await dataSource.destroy();
    console.log('Database connection closed.');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

runMigrations();
