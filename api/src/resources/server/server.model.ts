import {
  Table,
  Column,
  DataType,
  Unique,
  AllowNull,
  Length,
  IsAlphanumeric,
  BelongsToMany,
  Model,
  HasMany
} from 'sequelize-typescript';
import User from '../user/user.model';
import TagUserServer from './taguserserver.model';
import Message from '../message/message.model';

@Table({
  underscored: true,
  timestamps: true
})
export default class Server extends Model<Server> {
  @AllowNull(false)
  @Unique
  @Length({ min: 3, max: 15 })
  @IsAlphanumeric
  @Column(DataType.STRING)
  name: string;

  @BelongsToMany(
    () => User,
    () => TagUserServer
  )
  users: User[];

  @HasMany(() => Message)
  messages: Message[];
}
