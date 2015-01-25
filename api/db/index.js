console.log('setting up db');

var knex = require('knex');
var bookshelf = require('bookshelf');

var db, knex_conf;

knex_conf = knex(require('../knexfile.js').development); // TODO enviromentalize this shite
db = bookshelf(knex_conf);

module.exports = db;
