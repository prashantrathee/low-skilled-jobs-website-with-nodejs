const express = require('express');
const mysql = require('mysql');

//Create connection
const db= require('./routes/db-config');
const cookie = require('cookie-parser');    
const { application } = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require("path");
app.use('/assets',express.static(__dirname + '/assets'));
app.use('/public',express.static(__dirname+ '/public'));
app.set("view engine","ejs");
app.set("views","./views");
// app.set("partials","./views/partials");
app.use(cookie());
app.use(express.json());
app.use("/",require("./routes/pages"));
app.use("/api",require("./controllers/auth"));
app.use("/jobs",require("./controllers/jobs"));
// app.use("/profile",require("./controllers/profile"));

app.listen(3001);

db.connect((err)=>{
    if(err) {
        throw err;
    }else{
        console.log("My Sql connected ....");
        console.log(__dirname);
    }
});

// app.get('/adddata1',(req,res)=>{
//     let sql = 'CREATE TABLE example(id int AUTO_INCREMENT, title VARCHAR(255), PRIMARY KEY(id))';
//     db.query(sql,(err,result)=>{
//         if(err) throw err;
//         else{
//             console.log(result);
//             res.end("Data created");
//         }
//     }); 
// });
// //Create db
// app.get('/createdb',(req,res)=>{
//     let sql = 'CREATE DATABASE dbms';
//     db.query(sql,(err,result)=>{
//         if(err) throw err;
//         else{
//             console.log(result);
//             res.send("Database created");
//         }
//     });
// });

// //Create table
// app.get('/createTables',(req,res)=>{
//     // let sql1 = 'CREATE TABLE individuals(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255),gender VARCHAR(10),mobile VARCHAR(15),password VARCHAR(300),identity VARCHAR(255),address VARCHAR(255),qualification VARCHAR(255),userType VARCHAR(255),residence VARCHAR(255), PRIMARY KEY(id))';
//     // db.query(sql1,(err1,result1)=>{
//     //     if(err1) throw err1;
//     //     else {
//     //         console.log(result1);
//     //         res.send("posts table created");
//     //     }
//     // });
//     // let sql2 = 'CREATE TABLE organizations(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255),mobile VARCHAR(15),password VARCHAR(300),identity VARCHAR(255),userType VARCHAR(255),address VARCHAR(255), PRIMARY KEY(id))';
//     // db.query(sql2,(err2,result2)=>{
//     //     if(err2) throw err2;
//     //     else {
//     //         console.log(result2);
//     //         res.send("posts table created");
//     //     }
//     // });
//     let sql3 = 'CREATE TABLE jobs(jobID int AUTO_INCREMENT, jobType VARCHAR(30),jobDescription VARCHAR(500),vacancies int, employerName VARCHAR(255), employerEmail VARCHAR(255),employerID int,address VARCHAR(400),state VARCHAR(255),currency VARCHAR(5),amount int,payBasis VARCHAR(100),PRIMARY KEY(jobID))';
//     db.query(sql3,(err3,result3)=>{
//         if(err3)throw err3;
//         else{
//             console.log(result3);
//             res.send("created table");
//         }
//     });
//     let sql4 = 'CREATE TABLE applications(applicationID int AUTO_INCREMENT,jobID int, employerID int,applicantID int, experience VARCHAR(255),status VARCHAR(255),dateOfLastStatus VARCHAR(255), PRIMARY KEY(applicationID))';
// });

// //Insert post 1
// app.get('/addpost1',(req,res)=>{
//     let post = {
//         title:'Post one',
//         body:'this is post number 1',
//     };
//     let sql = 'INSERT INTO posts SET ?';
//     let query = db.query(sql,post,(err,result)=>{
//         if(err) throw err;
//         else {
//             console.log(result);
//             res.send("post 1 added");
//         }
//     });

// });

// //Insert post 2
// app.get('/addpost2',(req,res)=>{
//     let post = {
//         title:'Post two',
//         body:'this is post number 2',
//     };
//     let sql = 'INSERT INTO posts SET ?';
//     let query = db.query(sql,post,(err,result)=>{
//         if(err) throw err;
//         else {
//             console.log(result);
//             res.send("post 2 added");
//         }
//     });
// });

// //Select posts
// app.get('/getposts',(req,res)=>{
    
//     let sql = 'SELECT * FROM posts';
//     let query = db.query(sql,(err,results)=>{
//         if(err) throw err;
//         else {
//             console.log(results);
//             res.send("Posts fetched");
//         }
//     });
// });

// //Select single post
// app.get('/getposts/:id',(req,res)=>{
    
//     let sql = "SELECT * FROM posts WHERE id = "+req.params.id;
//     let query = db.query(sql,(err,result)=>{
//         if(err) throw err;
//         else {
//             console.log(result);
//             res.send("Posts fetched");
//         }
//     });
// });

// //Update post
// app.get('/updatepost/:id',(req,res)=>{
//     let newTitle = "Updated dfgdfg";
//     let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
//     let query = db.query(sql,(err,result)=>{
//         if(err) throw err;
//         else {
//             console.log(result);
//             res.send("Posts updated");
//         }
//     });
// });

// //Delete post
// app.get('/deletepost/:id',(req,res)=>{
//     let newTitle = "Updated dfgdfg";
//     let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
//     let query = db.query(sql,(err,result)=>{
//         if(err) throw err;
//         else {
//             console.log(result);
//             res.send("Posts updated");
//         }
//     });
// });

