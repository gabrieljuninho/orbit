import { User } from "@prisma/client";

export interface IUserData {
  username: string;
  email: string;
  password: string;
}

type IResponse = {
  status: number;
  message: string;
  data: User | null;
};

interface FieldErrors {
  [key: string]: Array<string>;
}

export interface ICreateUserResponse extends IResponse {
  errors?: FieldErrors;
}
