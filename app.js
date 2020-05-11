const http = require('http');
var fs = require('fs'); // file systesms
require("onnxjs");
//import {Tensor, InferenceSession} from 'onnxjs';

//var onnxData = fs.readFileSync('./add.onnx');

const hostname = '127.0.0.1';
const port = 3000;

var onnxData  = fs.readFile('./add.onnx', 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
});

/* const server = http.createServer((req, resp) => {
  //res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/plain');
  //res.end('Hello World');
  console.log('Requesting index file');
  fs.readFile("index.html",function(error,data){
    if(error){
        resp.writeHead(404);
        resp.write("Content not found");
    }else{
        resp.writeHead(200, {
            'Content-Type': 'text/html'
          });
          resp.write(data.toString());
          resp.end();

    }
  });
}); */

function serveFile(file, type, req, res) {
    fs.readFile(file, function(err, data) {
      if(err) {
        console.error("error");
        res.statusCode = 500;
        res.end("Server Error");
        return;
      }
      res.setHeader('ContentType', type);
      res.end(data);
    });
  }

var server = http.createServer(function(req, res){
    // Print the name of the file for which request is made.
    var url = require('url').parse(req.url);
    switch(url.pathname) {
        // Serving static files
        case '/':
        case '/index.html':
          serveFile('index.html', 'text/html', req, res);
          break;
        case '/style.css':
          //serveFile('public/style.css', 'text/css', req, res);
          break;
        case '/index.js':
          serveFile('index.js', 'text/css', req, res);
          break;
        case '/add.onnx':
          serveFile(onnxData, 'text/css', req, res);
          break;
    
        // Serve error code
        default:
          res.statusCode = 404;
          res.end("Not found");
      }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

