
var express=require("express");
var fs=require("fs");
var path=require("path");
var cors = require('cors')
 
const fileUpload = require('express-fileupload');
 
 
var bodyParser     =         require("body-parser");


var app=express();

// default options 
app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())




app.post("/upload",function(req,res){
		console.log("upload request received");
		//console.log(req.files.thefile);
	
	if(req.files.thefile){
		var file=req.files.thefile;
	req.files.thefile.mv(path.join(__dirname,"uploads",file.name),(err)=>{
		console.log("file uploaded-> " +path.join(__dirname,"uploads",file.name));
		console.log(err);
		if(err)
			return res.status(500).send(err);
		else
			return res.status(200).send("File Succesfully Uploaded");
		
		
	});

	}else{
		
		
		return res.status(400).send('No files were uploaded.');
 
	}
	
});
app.get(["/","/login"], function(req,res) {

           // res.send("Hello world");

    var html=fs.readFileSync(path.join(__dirname,"public","index.html"));
    res.write(html);       

});



app.use(express.static(path.join(__dirname,'public')));

app.get("/test",function(req,res){

    
    res.send(" <h1> testing</h1> <p> Your server is running </p> ");

});


console.log("starting server at localhost:8000")
app.listen(8000);



