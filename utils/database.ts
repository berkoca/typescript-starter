import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'mysql',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    storage: ':memory:',
    models: [__dirname + '/../models'],
    host: process.env.DB_HOST
});