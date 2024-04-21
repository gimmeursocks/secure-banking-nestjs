import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.config';
import { Transaction } from '../entity/transaction.entity';

export class User extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
    },
);

User.hasMany(Transaction);
User.sync();