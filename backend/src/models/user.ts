import mongoose, { Schema, Document } from 'mongoose';
export interface IUser extends Document { name: string; phone: string; }
const UserSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true }
});
export default mongoose.model<IUser>('User', UserSchema);