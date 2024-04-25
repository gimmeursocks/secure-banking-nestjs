import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../database/sequelize.config';
import { User } from '../../users/user.entity';

export class BankAccount extends Model {
    public account_num!: string;
    public balance!: string;
}

BankAccount.init(
    {
        account_num: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        balance: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'BankAccount',
    },
);

BankAccount.sync();