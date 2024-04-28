import { Model, DataType, Table, Column, ForeignKey } from 'sequelize-typescript';
import { BankAccount } from '../banks/bank-account/bank-account.entity';

@Table
export class User extends Model {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @ForeignKey(() => BankAccount)
    @Column({
        type: DataType.STRING,
    })
    account_num: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phone: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    SSN: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    gender: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'user',
    })
    role: string;
}