const express = require('express')
const OrientDB = require("orientjs");

const app = express()
app.listen(8080, () => {  
    console.log('SimSSE API')      

    

})


var server = OrientDB({
    host:       'localhost',
    port:       2424,
    username:   'root',
    password:   'simsse'
 });

 console.log(server)      


var db = server.use('SimSSE')

 console.log(db)   
 console.log('Using Database:', db.name);   


 server.close();

// https://orientdb.com/docs/last/orientjs/OrientJS.html
// https://orientdb.org/docs/3.0.x/orientjs/OrientJS-Server.html





/* OrientDBClient.connect({
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