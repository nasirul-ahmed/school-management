import { ObjectId } from "mongoose";

export interface IToken {
  _id: string | ObjectId;
  userId: string;
  userName?: string;
}

export type ITokenDTO = Partial<Omit<IToken, '_id'>>;
