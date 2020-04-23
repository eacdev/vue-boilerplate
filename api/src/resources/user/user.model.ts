import {
  Model,
  Table,
  Column,
  DataType,
  Unique,
  AllowNull,
  BeforeCreate,
  Length,
  IsAlphanumeric,
  BelongsToMany,
  HasMany
} from 'sequelize-typescript';
import bcrypt from 'bcrypt';
import Server from '../server/server.model';
import TagUserServer from '../server/taguserserver.model';
import Message from '../message/message.model';

@Table({
  underscored: true,
  timestamps: true
})
export default class User extends Model<User> {
  @AllowNull(false)
  @Unique
  @Length({ min: 3, max: 15 })
  @IsAlphanumeric
  @Column(DataType.STRING)
  username: string;

  @Length({ min: 8, max: 255 })
  @Column(DataType.STRING)
  password: string;

  @BelongsToMany(
    () => Server,
    () => TagUserServer
  )
  servers: Array<Server & { TagServerUser: TagUserServer }>;

  @HasMany(() => Message)
  messages: Message[];

  @BeforeCreate
  static async hashPassword(instance: User): Promise<void> {
    // eslint-disable-next-line no-param-reassign
    instance.password = await bcrypt.hash(instance.password, 12);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  // Remove password attribute when model is converted to JSON.
  toJSON(): User {
    const attributes = { ...this.get() } as User;
    delete attributes.password;
    return attributes;
  }
}
