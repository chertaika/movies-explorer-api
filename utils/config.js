require('dotenv').config();

const { PORT = 3000 } = process.env;
const { DB_URI = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { JWT_SECRET } = process.env;
const { NODE_ENV } = process.env;

const DEV_SECRET = 'super-puper-duper-dev-secret';
const SECRET_KEY = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : DEV_SECRET;

module.exports = {
  PORT,
  DB_URI,
  SECRET_KEY,
  NODE_ENV,
};
