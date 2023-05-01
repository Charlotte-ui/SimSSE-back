import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from "cors";
var debug = require('debug')('node-orientdb:server');

//const PORT = 8080; // 3000

/**
 * Routes
 */
var scenarios = require('./routes/scenarios');


/**
 * Initialise app
 */
const app = express()

app.use(cors({
  credentials:true,
}))
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

var Oriento = require('oriento');
var ODBserver = Oriento({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: 'root'
});

var graphDB = ODBserver.use('SimSSE');

// Add graph db to the request object so it can be
// accessed from user routes file.
app.use(function(req:any, res, next) {
  req.graphDB = graphDB;
  next();
});

app.use('/scenarios', scenarios);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  //err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err:any, req:any, res:any, next:any) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err:any, req:any, res:any, next:any) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


/**
 *  Initiate server
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Create HTTP server.
const HTTPserver = http.createServer(app);

// Listen on provided port, on all network interfaces.
HTTPserver.listen(port,() => {
  console.log('SimSSE API launch succesfuly')
  console.log('http://localhost:'+port+'/')
});

HTTPserver.on('error', onError);
HTTPserver.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val:any) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error:any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = HTTPserver.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

// 
/*

server.listen(PORT,() => {
  console.log('SimSSE API launch succesfuly')
  console.log('http://localhost:'+PORT+'/')
});


const expressSwagger = require("express-swagger-generator")(app);

app.use(cors()); 

const OrientDB = require("orientjs");


app.get("/", (req:any, res:any) => {
    res.send("SimSSE API");
  });


app.listen(port, () => {console.log('SimSSE API launch succesfuly')});


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

let options = {
    swaggerDefinition: {
      inflate: true,
      limit: "100kb",
      info: {
        title: "SimSSE API",
        description: "SimSSE API",
        version: "1.0.0",
      },
      host: "localhost:3000",
      basePath: "/",
      produces: ["application/json", "application/xml"],
      schemes: ["http", "https"],
      securityDefinitions: {
        JWT: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "",
        },
      },
    },
    basedir: __dirname, //app absolute path /** */
 //   files: ["./routes/**/*.js"], //Path to the API handle folder
//  };
/*  expressSwagger(options);
  
  module.exports = app;


  var server = OrientDB({
    host:       'localhost',
    port:       3000,
    username:   'root',
    password:   'simsse'
 });


 var db = server.use('SimSSE')
 console.log('Using Database:', db.name);





 console.log(server)      


var db = server.use('SimSSE')

 console.log(db)   
 console.log('Using Database:', db.name);   


 server.close();

// https://orientdb.com/docs/last/orientjs/OrientJS.html
// https://orientdb.org/docs/3.0.x/orientjs/OrientJS-Server.html


 OrientDBClient.connect({
  host: "localhost",
  port: 2480
}).then(client => {
    client.session({ name: "simsse", username: "root", password: "simsse" })
    .then(session => {
        // use the session
        // ... 
        // close the session
        console.log("Session");
        console.log(session);

        return session.close();
    });
    return client.close();
}).then(()=> {
   console.log("Client closed");
});

 */