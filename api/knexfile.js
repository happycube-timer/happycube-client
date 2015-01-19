// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'happycube_dev_db',
      user:     'happycube',
      password: 'happycube'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'postgresql'
    },
    seeds: {
      directory: './seeds/dev'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'postgresql'
    }
  }

};
