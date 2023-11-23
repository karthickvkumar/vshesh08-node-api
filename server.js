import express from "express";
import mysql from "mysql";
import cors from "cors";
import http from "http";

const app = express();
const server = http.createServer(app);

app.use(cors({
  credentials : true,
  origin : "*"
}));

app.use(express.json());

const connection = mysql.createConnection({
  host : "db4free.net",
  user : "vcentry",
  password : "test@123",
  database : "travelix",
  port : 3306
});

connection.connect((error) => {
  if(error){
    throw error;
  }
  else{
    console.log("Node js server is connected to Online MySQL server");
  }
});

// API URL : http://localhost:5000/api/user-list
// Method : GET
app.get("/api/user-list", (request, response) => {
  const sql_query = "SELECT * FROM vkk_table;"

  connection.query(sql_query, (error, result) => {
    if(error){
      response.status(500).send(error);
    }
    else{
      response.status(200).send(result);
    }
  })
})

// API URL : http://localhost:5000/api/submit-user
// Method : POST
app.post("/api/submit-user", (request, response) => {
  const sql = `INSERT INTO vkk_table (firstname, lastname, age, location) VALUES ('${request.body.firstname}', '${request.body.lastname}', ${parseInt(request.body.age)}, '${request.body.location}');`;

  connection.query(sql, (error, result) => {
    if(error){
      response.status(500).send(error);
    }
    else{
      response.status(200).send("User Account has been created");
    }
  })
})

// API URL : http://localhost:5000/api/delete/id
// Method : DELETE

app.delete("/api/delete/:Id", (request, response) => {

  const Id = request.params.Id;

  const sql_query = `DELETE FROM vkk_table WHERE Id='${Id}'`;

  connection.query(sql_query, (error, result) => {
    if(error){
      response.status(500).send(error);
    }
    else{
      response.status(200).send("User Account has been deleted");
    }
  })
})

// API URL : http://localhost:5000/api/edit/user
// Method : PUT

app.put("/api/edit/user", (request, response) => {
  const sql_query = `UPDATE vkk_table SET firstname='${request.body.firstname}', lastname='${request.body.lastname}', age=${parseInt(request.body.age)}, location='${request.body.location}' WHERE Id=${request.body.Id};`
  
  connection.query(sql_query, (error, result) => {
    if(error){
      response.status(500).send(error);
    }
    else{
      response.status(200).send("User Account has been modified");
    }
  })
})

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log("Node js server is running");
});