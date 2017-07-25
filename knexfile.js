// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/july24'
	},

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
