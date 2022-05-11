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

    res.status(201).json({
      status: 'success',
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data',
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'username or password incorrect!',
    });
  }
};
