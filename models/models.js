var path= require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = "sqlite";
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//Cargo modelo ORM
var Sequelize= require('sequelize');

//Usamos BBDD SQLite o postgres
var sequelize = new Sequelize(DB_name, user, pwd,
    { dialect: dialect,
      protocol: protocol,
      port: port,
      host: host,
      storage: storage,
      omitNull: true
    }
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
      Quiz.create({pregunta: '¿Capital de Italia?', respuesta: 'Roma'
	});
	Quiz.create({pregunta: '¿Capital de Portugal?',respuesta: 'Lisboa'
      })
      .then(function(){console.log('BBDD inicializada')});
    };
  });
});


