var knex_conf = require('./knexfile.js')
  , knex = require('knex')(knex_conf.development);

knex
  .select('*')
  .from('users')
  .then(function (rows) {
    console.log(rows);
  });
