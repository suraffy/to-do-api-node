const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
      trim: true,
      maxLength: [32, 'Name too long!'],
    },
    username: {
      type: String,
      required: [true, 'username is required!'],
      trim: true,
      maxLength: [32, 'username too long!'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password!'],
    },
    avatar: Buffer,
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  return jwt.sign({ id: user.id }, 'secretekey', {
    expiresIn: '90d',
  });
};

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
    user.passwordConfirm = undefined;
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
