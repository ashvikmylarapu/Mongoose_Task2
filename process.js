var express=require('express');
var fs=require('fs');
var url=require('url');
const mongoose=require('mongoose');
const Schema =mongoose.Schema;
// var MongoClient=require('mongodb').MongoClient;
var app=express();
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/mydb');

mongoose.connection.once('open',function(){
	console.log('Connection is made');
}).on('error',function(error){
	console.log('Connection error',error);
});

const Student = new Schema({
	name: {type: String, required:true, trim:1},
	itemName:{type: String, required:true, trim:1},
	price:{type: Number, trim:1},
	quantity:{type: String, required:true, trim:1}
});

const mod = mongoose.model('cart',Student);

app.post('/items',function(req,res){

	var venk = new mod(
		{
			name:req.query.name,
			itemName:req.query.itemname,
			price:req.query.price,
			quantity:req.query.quantity
		});

	venk.save(function(error){
		if(error)
		{
			res.status(500).send('Failed to save data: ' + error )
			return;	
		}
		else{
			res.status(200).send('Successfully saved data ' + req.query.name);
        }
	});
	

})

app.get('/items',function(req,res){
	 mod.find({}).then(function(result){
		 console.log(result);
		 res.status(200).json(result);
	 })
})

app.get('/form',function(req,res){
	fs.readFile(__dirname+'/index.html',function(err,data){
		res.writeHead(200,{'Content-Type': 'text/html'});
		res.write(data);
		res.end();
	});
})
var ser=app.listen(8080,function(){
	console.log("server is up"+ser.address().port);
})