export default {
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASS || 'Codmod3!',
    database: process.env.MYSQL_DB || 'GymWebsite',
    port: Number(process.env.MYSQL_PORT) || 3306,
  },
  auth: {
    secretKey: process.env.SECRET_KEY || '0',
  },
  server: {
    port: Number(process.env.PORT) || 8080,
  },
};
  