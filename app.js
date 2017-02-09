var express = require("express");
var morgan = require("morgan");
var path = require("path");
var fs = require("fs");

var app = express();

app.use(morgan("short"));
//
// app.use(function(req, res, next){
//   console.log("Request IP: " + req.url);
//   console.log("Request date: " + new Date());
//   next();
// });

var staticPath = path.join(__dirname, "static");
app.use(express.static(staticPath));
//
// app.use(function(req, res, next){
//   var filePath = path.join(__dirname, "static", req.url);
//   fs.stat(filePath, function(err, fileInfo){
//     if(err){
//       next();
//       return;
//     }
//     if(fileInfo.isFile()){
//       res.sendFile(filePath);
//     } else{
//       next();
//     }
//   });
// });

app.use(function(req, res, next) {
  var filePath = path.join(__dirname, "static", req.url);
  res.sendFile(filePath, function(err) {
    if (err) {
      next(new Error("Error sending file!"));
    }
  });
});

app.use(function(req, res){
  res.status(404);
  res.send("File not found!");
});

app.use(function(err, req, res, next){
  console.error(err);
  next(err);
});

app.use(function(err, req, res, next){
  res.status(500);
  res.send("Internet server error.");
});

app.listen(3000, function(){
  console.log("App started on port 3000");
});
