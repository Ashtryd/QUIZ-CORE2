var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});


//pregunta
//router.get('/quizes/question', quizController.question);
router.get('/quizes',                       quizController.index);
router.get('/quizes/:quizId(\\d+)',         quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',  quizController.answer);

//respuesta
 router.get('/quizes/answer',   quizController.answer);
//autor
router.get("/author", function(req, res) {
		res.render("author");}
 );

module.exports = router;
