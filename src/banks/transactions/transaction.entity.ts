import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../database/sequelize.config';
import { User } from '../../users/user.entity';

export class Transaction extends Model {
    public id!: number;
    public sender!: string;
    public receiver!: string;
    public amount!: string;
    public comment!: string;
}

Transaction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'Transaction',
    },
);

Transaction.belongsTo(User, { as: 'sender' });
Transaction.belongsTo(User, { as: 'receiver' });
Transaction.sync();