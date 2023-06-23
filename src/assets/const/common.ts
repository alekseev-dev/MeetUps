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
  UserMyMeetups = 'user/my-meetups',
  UserAllMeetups = 'user/all-meetups',
  UserEditMeetup = 'user/edit-meetup',
  UserCreateMeetup = 'user/create-meetup',
  AdminMyMeetups = 'admin/user/my-meetups',
  AdminAllMeetups = 'admin/all-meetups',
  AdminEditMeetup = 'admin/edit-meetup',
  AdminCreateMeetup = 'admin/create-meetup',
  AdminUsersList = 'admin/users-list'
}

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}
