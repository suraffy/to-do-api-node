const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
      trim: true,
      maxLength: [32, 'Name too long!'],
    },
    userName: {
      type: String,
      required: [true, 'userName is required!'],
      trim: true,
      maxLength: [32, 'userName too long!'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password!'],
    },
    avatar: Buffer,
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
