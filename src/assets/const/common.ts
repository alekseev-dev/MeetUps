export enum APIRoute {
  User = '/user',
  UserRole = '/user/role',
  AuthLogin = '/auth/login',
  AuthRegistration = '/auth/registration',
  Meetup = '/meetup',
}

export enum AppRoute {
  Root = '',
  Login = 'login',
  Instruction = 'instruction',
  MyMeetups = 'my-meetups',
  AllMeetups = 'all-meetups',
  EditMeetup = 'edit-meetup',
  UserCreateMeetup = 'create-meetup',
  UsersList = 'users-list'
}

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}
