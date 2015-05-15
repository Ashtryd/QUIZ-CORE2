// GET /quizes/question

var models= require('../models/models.js');

exports.question= function(req, res){
   // res.render('quizes/question', {pregunta: '¿Capital de Italia?'});
	models.Quiz.findAll().then(function(quiz){
      res.render('quizes/question', {pregunta: quiz[0].pregunta});
   })
};

// GET /quizes/answer
exports.answer= function(req, res){
    /*if(req.query.respuesta === "Roma"){
      res.render('quizes/answer', {respuesta: 'Correcto'});
    } else{
      res.render('quizes/answer', {respuesta: 'Incorrecto'});
    }*/

 models.Quiz.findAll().then(function(quiz){
      if(req.query.respuesta === quiz[0].respuesta){
        res.render('quizes/answer', {respuesta: 'Correcto'});
     } else{
        res.render('quizes/answer', {respuesta: 'Incorrecto'});
      }
    })


};
