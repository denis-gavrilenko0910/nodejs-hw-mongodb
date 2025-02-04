import { Schema, model } from 'mongoose';

import { handeSaveError, setUpdateSettings } from './hooks.js';

import { emailRegexp } from '../../constants/users.js';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', handeSaveError);
userSchema.pre('findOneAndUpdate', setUpdateSettings);
userSchema.post('findOneAndUpdate', handeSaveError);

const UserCollection = model('user', userSchema);

export default UserCollection;
