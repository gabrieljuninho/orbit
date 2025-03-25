import { api } from "@/lib/api";

import { ICreateUserResponse, IUserData } from "@/features/auth/types";

export const createUser = async (
  data: IUserData
): Promise<ICreateUserResponse> => {
  const response = await api.post("/api/users/signup", data);

  return response.data;
};
