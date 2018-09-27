var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { email });
});

router.get('/login', function(req, res, next) {
  res.render('login', { email });
});


var email;

router.get('/moncompte',
    function(req, res, next) {
      res.render('index', { email: req.session.email });
    }
);

router.post('/login',
    function(req, res, next) {
      req.session.email = req.body.email;
      res.render('login', { email: req.session.email });
    }
);


module.exports = router;
