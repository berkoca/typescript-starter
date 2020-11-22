import { sequelize } from './database';

export function syncDB(alter: boolean) {
    sequelize.sync({ alter: alter });
}
