import { ObjectId } from 'mongoose';
import { IBase } from './IBase';
import { UserRole } from '../helper/enums';

export interface IUser extends IBase {
  _id: string | ObjectId;
  email: string;
  phone: string;
  role: UserRole;
  username: string;
  password: string;
  salt: string;
  token: string;
  isActive: boolean;
}

export type IUserDTO = Partial<Omit<IUser, '_id'>>;
