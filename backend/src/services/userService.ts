import User, { IUser } from '../models/user';

export const createUser = async (userData: Partial<IUser>) => {
  const user = new User(userData);
  await user.save();
  return user;
};

export const findUserById = async (id: string) => {
  return await User.findById(id);
};