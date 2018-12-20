var mongoose = require('mongoose'); 



// var dbURI = 'mongodb://localhost:27017/mongooseAPI'; local uri
var dbURI = 'mongodb://admin:abc123@ds161112.mlab.com:61112/mavimtruck'
mongoose.connect(dbURI,{useNewUrlParser: true});
mongoose.set('useCreateIndex', true);//ne olduğu bilmiyorum warning için yazdim :)))

//Baglanıldığında bilgileri yazar
mongoose.connection.on('connected',function(){
	console.log('Mongoose' +dbURI+ ' adresindeki veritabanına bağlantdı\n');
});



//Baglantı hatası
mongoose.connection.on('error',function(err){
	console.log('Mongoose bağlantı hatası\n: ' + err );
});

//Bağlantı Kesilmesi
mongoose.connection.on('disconnected',function(){
	console.log('Mongoose bağlantısı kesildi\n');
});


kapat = function(msg,callback) {
	mongoose.connection.close(function() {
		console.log('Mongoose kapatıldı\n' + msg)
		callback();
	});
};


//Nodemon için ayrı kapatma işlemi
process.once('SIGUSR2', function(){
	kapat('nodemon kapatıldı\n',function(){
		process.kill(process.pid, 'SIGUSR2');
	});
});



//Uygulama kapandıpı kapat
process.on('SIGINT', function(){
	kapat('Uygulama kapatıldı\n',function(){
		process.exit(0);
	});
});


//Herokuda kapatılırsa
process.once('SIGTERM', function(){
	kapat('Heroku kapatıldı\n',function(){
		process.exit(0);
	});
});


require('./semalar');
