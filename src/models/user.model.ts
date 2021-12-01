import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  firstName: string;
  lastName: string;
  password: string;
}
