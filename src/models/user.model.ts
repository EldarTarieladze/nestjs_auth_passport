import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export interface IUser extends mongoose.Document {
  _id: string;
  email: string;
  role: string;
  password: string;
}
