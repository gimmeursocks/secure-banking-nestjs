import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.config';
import { BankAccount } from '../banks/bank-account/bank-account.entity';

export class User extends Model {
    public email!: string;
    public username!: string;
    public password!: string;
    private pass_salt!: string;
    public phone!: string;
    public SSN!: string;
    public gender!: string;
    public address!: string;
    public admin!: boolean;
}

User.init(
    {
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pass_salt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        SSN: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },
    {
        sequelize,
        modelName: 'User',
    },
);

User.belongsTo(BankAccount, { as: '_' });
User.sync();