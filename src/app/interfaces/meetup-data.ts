export interface IMeetupData {
  id: number;
  name: string;
  description: string;
  location: string;
  targetAudience: string;
  needToKnow: string;
  willHappen: string;
  reasonToCome: string;
  time: string;
  duration: number;
  createdBy: number;
  owner: IOwner;
  users: IOwner[];
}

export interface IOwner {
  id: number;
  email: string;
  password: string;
  fio: string;
}

export type TCreateMeetup = Omit<IMeetupData, 'users' | 'owner' | 'createdBy' | 'id'>
