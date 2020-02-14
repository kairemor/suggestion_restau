const express = require('express');
var router = express.Router();

const authenticate = require('../authenticate');
const Suggestion = require('../models/suggestion');

router.route('')
  .get(authenticate.verifyUser, (req, res, next) => {
    let sendAppreciation = false;
    let query = {};
    if (req.query.appreciationRepas) {
      console.log(req.query);
      sendAppreciation = true;
      delete req.query.appreciationRepas;
    }
    if (req.query.search) {
      query = JSON.parse(req.query.search);
      if (query.thisWeek) {
        console.log(query.thisWeek);
        const curr = new Date(); // get current date
        const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        const firstDay = new Date(curr.setDate(first) - 1).toUTCString();
        query.createdAt = {
          $gte: new Date(firstDay)
        };
      }
      delete query.thisWeek;
    }
    console.log(query);
    Suggestion.find(query)
      .then(data => {
        if (!sendAppreciation) {
          suggestions = data.map(suggestion => {
            const sugges = {
              classroom: suggestion.classroom,
              suggestion: suggestion.suggestion,
              sex: suggestion.sex
            };
            return sugges;
          });
          res.json(suggestions);
        } else {
          res.json(data);
        }
      })
      .catch(err => console.log(err));
  })
  .post((req, res, next) => {
    let appreciationRepas = req.body.appreciationRepas || '';
    appreciationRepas = appreciationRepas.split(':');
    appreciationRepas = appreciationRepas.map(appreciation => {
      appreciation2 = appreciation.split(',');
      return JSON.stringify({
        'day_number': appreciation2[0],
        'repas': appreciation2[1],
        'diner': appreciation2[2]
      });
    });
    req.body.appreciationRepas = appreciationRepas;
    Suggestion.create(req.body)
      .then(data => {
        const repas = data.appreciationRepas.map(aprec => {
          return JSON.parse(aprec);
        });
        console.log(repas);
        data.appreciationRepas = repas;
        res.json({
          msg: 'success',
          data: data
        });
      });
  });

router.route('/:id')
  .put(authenticate.verifyUser, (req, res, next) => {
    Suggestion.findById(req.params.id)
      .then(suggestion => {
        let readBy = suggestion.readBy;
        readByList = readBy.split(',');
        if (!readByList.find(data => data === req.body.readBy)) {
          readBy += `${req.body.readBy},`;
          suggestion.readBy = readBy;
          suggestion.save()
            .then(sugges => {
              res.json({
                data: sugges
              });
            })
            .catch(err => console.log(err));
        }
        res.json(suggestion);
      });
  });

module.exports = router;