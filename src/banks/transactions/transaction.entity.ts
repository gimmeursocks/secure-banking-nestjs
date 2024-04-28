import { User } from '../../users/user.entity';
import {
  Model,
  DataType,
  Table,
  Column,
  ForeignKey,
} from 'sequelize-typescript';

@Table
export class Transaction extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  sender: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  receiver: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  amount: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  comment: string;
}
