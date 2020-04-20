import { Sequelize } from 'sequelize-typescript';

const database = new Sequelize({
  dialect: 'postgres',
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASS,
  models: [`${__dirname}/resources/!(base)/**/*.model.ts`],
  logging: false
});

export default database;
