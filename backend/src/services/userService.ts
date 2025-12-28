import User from '../models/user';

export const findOrCreateUser = async (name: string, phone: string) => {
    let user = await User.findOne({ phone });
    if (!user) {
        user = new User({ name, phone });
        await user.save();
    }
    return user;
};

export const getAllUsersFromDb = async () => {
    return await User.find();
};