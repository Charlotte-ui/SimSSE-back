import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from "cors";

const PORT = 8080; // 3000


// Initialise app
const app = express()
app.use(cors({
  credentials:true,
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


// Initiate server

const server = http.createServer(app);

server.listen(PORT,() => {
  console.log('SimSSE API launch succesfuly')
  console.log('http://localhost:'+PORT+'/')
});

/*
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