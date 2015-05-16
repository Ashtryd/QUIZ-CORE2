// GET /quizes/question

var models= require('../models/models.js');


exports.load= function(req, res, next, quizId){
  models.Quiz.find(quizId).then(
    function(quiz){
      if(quiz){
        req.quiz=quiz;
        next();
      } else{
	       next(new Error('No existe el quizId '+ quizId));
      }
    }
  ).catch(function(error) { next(error);});
};

//GET /quizes
exports.index = function(req, res) {
   if(req.query.search){
    models.Quiz.findAll({where: ["pregunta like ?",
    "%"+req.query.search.replace(" ","%")+"%"]}).then(function(quizes) {
      res.render('quizes/index.ejs', { quizes: quizes});
    });
  }else{
    models.Quiz.findAll().then(function(quizes) {
      res.render('quizes/index.ejs', { quizes: quizes});
    });
  }
};


exports.show= function(req, res){
	
	res.render('quizes/show', {quiz : req.quiz});
       
 }
//GET quizes/new
exports.new = function(req,res){
  var quiz = models.Quiz.build(
    {pregunta: "Pregunta", respuesta: "Respuesta"});

  res.render('quizes/new', {quiz: quiz});
}

//GET quizes/create
exports.create = function(req,res){
  var quiz= models.Quiz.build(req.body.quiz);

  //Guardar en la DB los datos agregados
  quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
    res.redirect('/quizes');
  });
}



// GET /quizes/answer
exports.answer= function(req, res){
   
	var resultado = 'Incorrecto';
     		 if(req.query.respuesta === req.quiz.respuesta){
      			 resultado = 'Correcto';
       }
	res.render('quizes/answer', {quiz : req.quiz, respuesta : resultado});


   
   


};
