const jwt = require('jsonwebtoken');
const config = require('./config/config');

exports.verifyUser = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (token) {
    if (token.startsWith('bearer') || token.startsWith('Bearer')) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, config.secretKey, (err, decoded) => {
      if (err) {
        res.sendStatus(401);
        return res.json({
          success: false,
          message: err.name
        });
      } else {
        req.decoded = decoded;
        req.token = token;
        next();
      }
    });
  } else {
    res.sendStatus(401);
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

exports.verifyAdmin = (req, res, next, user) => {
  if (user.admin) {
    next();
  } else {
    const err = new Error('admin needed');
    next(err);
  }
};