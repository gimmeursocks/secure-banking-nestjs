import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.config';

export class Transaction extends Model {
    public id!: number;
    public email!: string;
    public amount: number;
}

Transaction.init(
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
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Transaction',
    },
);


Transaction.sync();