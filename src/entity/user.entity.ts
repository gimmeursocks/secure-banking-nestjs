import { Model, DataTypes, Transaction } from 'sequelize';
import { sequelize } from '../database/sequelize.config';
//import { transactions } from '../entity/transactions.entity';
export class User extends Model {
    public id!: number;
    public email!: string;
    public password!: string;

    // Define other methods or customizations here if needed
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

//User.hasMany(transactions);
User.sync();

export default User;
