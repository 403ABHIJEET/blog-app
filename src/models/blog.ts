import mongoose, { Schema, Document } from 'mongoose';

export interface IComments extends Document {
    writer: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema: Schema<IComments> = new Schema(
    {
        writer: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: [true, 'At least one character is required.'],
        },
    },
    {
        timestamps: true, 
        _id: true,         
    }
);

export interface IBlog extends Document {
    writer: string
    title: string;
    content: string;
    comments: IComments[];
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema: Schema<IBlog> = new Schema(
    {
        writer: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: [true, 'There should be at least 20 characters.'],
        },
        comments: [CommentSchema], 
    },
    {
        timestamps: true, 
    }
);

const BlogModel = (mongoose.models.Blog as mongoose.Model<IBlog>) || mongoose.model<IBlog>('Blog', BlogSchema);

export default BlogModel;
