export type Issue = {
  name: string;
  description: string;
};

export interface Room {
  id: string;
  name: string;
  admin: string;
  issue?: Issue;
  createdAt: Date;
  status: 'idle' | 'voting' | 'counting';
  members: { [member: string]: string };
  votes?: { [member: string]: number };
}
