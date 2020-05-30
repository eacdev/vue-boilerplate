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
import Hashids from 'hashids';

@Table({
  underscored: true,
  timestamps: true
})
export default class Server extends Model<Server> {
  @AllowNull(false)
  @Unique
  @Length({ min: 3, max: 15 })
  @Column(DataType.STRING)
  name: string;

  inviteCode: string;

  @BelongsToMany(
    () => User,
    () => TagUserServer
  )
  users: User[];

  @HasMany(() => Message)
  messages: Message[];

  toJSON(): Server {
    const attributes = { ...this.get() } as Server;

    // todo use a salt
    const hashids = new Hashids('', 6);
    attributes.inviteCode = hashids.encode(attributes.id);

    return attributes;
  }
}
