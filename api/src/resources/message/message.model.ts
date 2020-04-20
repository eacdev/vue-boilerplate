import {
  Table,
  Column,
  DataType,
  AllowNull,
  Model,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import User from '../user/user.model';
import Server from '../server/server.model';

@Table({
  underscored: true,
  timestamps: true
})
export default class Message extends Model<Message> {
  @AllowNull(false)
  @Column(DataType.TEXT({ length: 'long' }))
  text: string;

  @ForeignKey(() => User)
  @Column(DataType.BIGINT)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Server)
  @Column(DataType.BIGINT)
  serverId: number;

  @BelongsTo(() => Server)
  server: Server;

  // Remove password attribute when model is converted to JSON.
  // We have to do this because sequelize doesn't recursively call toJSON.
  // https://github.com/sequelize/sequelize/issues/3891
  toJSON() {
    const attributes = <Message>{ ...this.get() };
    delete attributes.user.password;
    return attributes;
  }
}
