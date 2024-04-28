import { Model, DataType, Table, Column } from 'sequelize-typescript';

@Table
export class BankAccount extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  account_num: string;

  @Column({
    type: DataType.STRING,
  })
  balance: string;
}
