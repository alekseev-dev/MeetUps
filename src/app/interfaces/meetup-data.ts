// export interface IMeetupData {
//   cardTitle: string,
//   targetTitle: string,
//   targetDescription: string,
//   whatToKnowTitle: string,
//   whatToKnowDescription: string[],
//   whatWillBeTitle: string,
//   whatWillDescription: string[],
//   whyShouldComeTitle: string,
//   whyShouldComeDescription: string,
//   subsCount: number,
//   cardDescription: string,
//   author: string,
//   roomNumber: number,
//   meetTime: string,
// }

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
