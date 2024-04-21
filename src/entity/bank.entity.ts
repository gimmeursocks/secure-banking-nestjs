import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.config';
import { User } from '../entity/user.entity';

export class Bank extends Model {
    public id!: number;
    public name!: string;
}

Bank.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Bank',
    },
);

Bank.hasMany(User);
Bank.sync();