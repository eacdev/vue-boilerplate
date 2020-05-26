interface Server {
  id: number;
  name: string;
  inviteCode: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export default Server;
