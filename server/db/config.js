// configure the database
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'admin',
    password : 'formidable',
    database : 'fotos',
    charset  : 'UTF8',
  },
  useNullAsDefault: true,
});


const db = require('bookshelf')(knex);
db.plugin('registry'); // resolves circular dependencies

// Schemas for all tables used

/* Users table */
db.knex.schema.hasTable('users').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('users', (user) => {
      user.increments('id').primary();
      user.string('name', 100);
      user.string('fbId', 255);
      user.string('access_token', 255);
    }).then((table) => {
      console.log('Created Table', table);
    });
  }
});

/* Arcs table */
db.knex.schema.hasTable('arcs').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('arcs', (arc) => {
      arc.increments('id').primary();
      arc.string('name', 100);
      arc.timestamps();
      arc.string('criteria', 255);
      arc.date('query_start_date');
      arc.date('query_end_date');
      arc.integer('user_id').unsigned().references('users.id'); // unsigned() is NECESSARY in mysql
    }).then((table) => {
      console.log('Created Table', table);
    });
  }
});

/* Images table */
db.knex.schema.hasTable('images').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('images', (image) => {
      image.increments('id').primary();
      image.integer('height');
      image.integer('width');
      image.string('url', 255);
      // could also potentially use table here so that 1 image can be in more than 1 arc
      image.integer('arc_id').unsigned().references('arcs.id');
    }).then((table) => {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
