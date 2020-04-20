import { Table, Column, ForeignKey, DataType, Model } from 'sequelize-typescript';
import User from '../user/user.model';
import Server from './server.model';

@Table({
  underscored: true,
  timestamps: true
})
export default class TagUserServer extends Model<TagUserServer> {
  @ForeignKey(() => User)
  @Column(DataType.BIGINT)
  userId: number;

  @ForeignKey(() => Server)
  @Column(DataType.BIGINT)
  serverId: number;
}
