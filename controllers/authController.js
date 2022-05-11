const User = require('./../models/userModel');

exports.authenticate = async (req, res, next) => {
  try {
    let rha = req.headers.authorization;
    rha = rha && rha.startsWith('Bearer ') ? rha.split(' ')[1] : undefined;
    let rhc = req.headers.cookie;
    rhc = rhc ? rhc.split('=')[1] : undefined;

    const token = rha ? rha : rhc;
    if (!token) throw new Error();

    const decoded = jwt.verify(token, 'secretecode');

    // Check if the user is not deleted after the token has issued
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) throw new Error();

    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: 'You are not authorized!',
    });
  }
};
