const cors = require('cors');
const express = require('express');
const whiteList = ['*'];

const corsOptionPara = (req, callback) => {
  var corsOptions;
  if (whiteList.indexOf(req.header('Origin') !== -1)) {
    corsOptions = {
      origin: true
    };
  } else {
    corsOptions = {
      origin: false
    };
  }
  callback(null, corsOptions);
};

exports.cors = cors();
exports.corsOption = cors(corsOptionPara);