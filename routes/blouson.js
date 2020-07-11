const express = require('express');
const router = express.Router();

const authenticate = require('../authenticate');
const Blouson = require('../models/blouson');

router.route('')
  .post(authenticate.verifyUser, (req, res, next) => {
    console.log(req.body)
    Blouson.create(req.body)
      .then(blouson => {
        res.status = 201
        res.json(blouson)
      })
      .catch(err => {
        console.log(err);
        res.json({
        status: 'failed',
        message: err.errmsg
        }
      )}
      );
  })
  .get(authenticate.verifyUser, (req, res, next) => {
    Blouson.find()
      .then(blousons => {
        res.json(blousons)
      })
      .catch(err => res.json({
        status: 'failed',
        message: err.errmsg
      }));
  });


module.exports = router;
module.exports = router;