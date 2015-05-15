var path= require('path');

var Sequelize= require('sequelize');

//Usamos SQLite
var sequelize= new Sequelize(null,null,null,
    {dialect: 'sqlite', storage: 'quiz.sqlite'}
    );

//Importa la definicion de la tabla en quiz.js
var Quiz= sequelize.import(path.join(__dirname,'quiz'));
//Exporta la definicion en Quiz
exports.Quiz= Quiz;

//Inicializa la tabla de preguntas
//success(...) ejecuta el manejador
sequelize.sync().then(function(){
  //Devuelve numero de filas de la tabla
  Quiz.count().then(function(count){
    if(count === 0){
      //Crea primera pregunta
      Quiz.create({pregunta: '¿Capital de Italia?',
      respuesta: 'Roma'
      })
      .then(function(){console.log('BBDD inicializada')});
    };
  });
});


