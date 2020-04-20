interface Message {
  id: number;
  text: string;
  userId?: number;
  serverId?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export default Message;
