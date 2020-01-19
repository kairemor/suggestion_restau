const express = require('express');
const router = express.Router();

const authenticate = require('../authenticate');
const Repas = require('../models/repas');


router.route('')
  .post(authenticate.verifyUser, (req, res, next) => {
    Repas.create(req.body)
      .then(repas => {
        res.status = 200;
        res.json(repas);
      })
      .catch(err => res.json({
        status: 'failed',
        message: err.errmsg
      }));
  })
  .get((req, res, next) => {
    Repas.find()
      .then(repas => {
        res.json(repas);
      })
      .catch(err => res.json({
        status: 'failed',
        message: err.errmsg
      }));
  });

router.put('/:day_number', authenticate.verifyUser, (req, res, next) => {
  const day_number = req.params.day_number;
  const data = req.body;
  delete data.day_number;

  Repas.findOneAndUpdate({
      day_number: day_number
    }, data, {
      new: true
    })
    .then((user) => {
      res.json({
        status: 'success',
        data: user
      });
    })
    .catch((err) => {
      res.json({
        status: 'failed',
        message: err.message
      });
    });
});

router.get('/today', authenticate.verifyUser, (req, res, next) => {
  const today = new Date();
  Repas.findOne({
      day_number: today.getDay()
    })
    .then(repas => {
      res.json(repas);
    })
    .catch(err => {
      res.status = 403;
      res.json({
        status: 'failed',
        message: err.message
      });
    });
});

module.exports = router;
