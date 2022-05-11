const User = require('./../models/userModel');

const filter = (obj, allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((prop) =>
    allowedFields.includes(prop) ? (newObj[prop] = obj[prop]) : undefined
  );

  return newObj;
};

exports.signUp = async (req, res) => {
  try {
    const allowedFields = ['name', 'username', 'password', 'passwordConfirm'];
    const filteredBody = filter(req.body, allowedFields);

    const user = new User(filteredBody);
    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: 'username or password incorrect!' });
  }
};

exports.me = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (err) {
    res.status(404).json({ error: 'User not found!' });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const allowedFields = ['name', 'username'];
    const filteredBody = filter(req.body, allowedFields);

    const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true,
    });
    if (!user) throw new Error();

    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ error: 'Can not update user!' });
  }
};

exports.deleteMe = async (req, res) => {
  try {
    req.user.delete();

    res.status(204).json();
  } catch (err) {
    res.status(500).json({ error: 'Can not delete user!' });
  }
};
