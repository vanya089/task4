import {Schema, model} from 'mongoose';


interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    registrationDate?: Date;
    lastLoginDate?: Date;
    status?: string;
    complete?: boolean;
}

const UserSchema = new Schema<IUser>({
    email: {type: String, unique: true, required: true},
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    registrationDate: Date,
    lastLoginDate: Date,
    status: String,
    complete: Boolean,
});

const User = model<IUser>('User', UserSchema);

export default User;