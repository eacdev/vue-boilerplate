interface User {
  id: number;
  username: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export default User;
