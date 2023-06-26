import { Role } from "src/assets/const/common";

export interface IUser {
  email: string;
  exp: number;
  iat: number;
  id: number;
  roles: IRole[];
};

export interface IRole {
  UserRole: {
    createdAt: string;
    id: number;
    roleId: number;
    updatedAt: string;
    userId: number;
  },
  createdAt: string;
  id: string;
  name: Role;
  updatedAt: string;
};

export interface IUserlistItem {
  createdAt: string;
  email: string;
  fio: string;
  id: number;
  password: string;
  roles: IRole[];
  updatedAt: string;
}
