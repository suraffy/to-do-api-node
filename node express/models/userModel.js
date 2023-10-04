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
      minLength: [4, 'password too short!'],
      select: false,
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

userSchema.statics.findByCredentials = async function (username, password) {
  const user = await this.findOne({ username }).select('+password');
  if (!user) throw new Error();

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error();

  return user;
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
