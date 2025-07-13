import mongoose, { Schema, Document } from 'mongoose';

const profilePic: string = process.env.DEFAULT_PROFLE_PIC ?? ''

export interface IUser extends Document {
    username: string
    email: string
    profile: string
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/,
        },
        profile: {
            type: String,
            required: true,
            default: profilePic
        }
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;
