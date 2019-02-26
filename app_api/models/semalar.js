var mongoose = require( 'mongoose' );
const jwt = require('jsonwebtoken');


var AracSema = new mongoose.Schema({

    marka:{type:String,required:true},
    model:{type:String,required:true},
    kasa_tipi:{type:String,required:true},
    max_agirlik:{type:Number,required:true}

})


var SoforSema = new mongoose.Schema({

    ad_soyad:{type:String,required:true,unique:true},
    telefon:{type:String,required:true},
    eposta:{type:String,required:true,unique:true},
    sifre:{type:String,required:true},
    arac_id:{
		type:  mongoose.Schema.Types.ObjectId,
		
	},
	lisanslar:{type:[String],required:true},
	puan:{type:Number}

});

var IslerSema = new mongoose.Schema({
    is_veren_id:{
		type:  mongoose.Schema.Types.ObjectId,
		required: true,
		
	},
	son_basvuru_tarihi:{type:String,required:true},
	kasa_tipi:{type:String,required:true},
	ilan_basligi:{type:String,required:true},
	max_agirlik:{type:Number,required:true},
	fiyat:{type:String,required:true},
	isveren_ad:{type:String,required:true},
	is_tarihi:{type:String,required:true},
	gerekli_lisanslar:{type:[String],required:true},
	yuk_cinsi:{type:String,required:true},
	hareket_yeri:{type:String,required:true},
	varis_yeri:{type:String,required:true},
	is_icin_verilen_sure:{type:String,required:true},
	basvuranlar:[{
		
			sofor_id:{type:String},
			durum:{type:Number},
			
	}]

});

var IsverenSema = new mongoose.Schema({
   

	sirket_adi:{type:String,required:true,unique:true},
	sifre:{type:String,required:true},
	telefon:{type:String,required:true},
	vergi_no:{type:String,required:true,unique:true},
	sicil_no:{type:String,required:true,unique:true},
	e_posta:{type:String,required:true,unique:true},
	puan:{type:Number},

});


IsverenSema.methods.tokenOlustur = function (){

	var is_veren = this;
	var access = 'auth';
	var token =  jwt.sign({_id : is_veren._id.toHexString(),access},'NaCl').toString();

	is_veren.tokens.push({
		access,
		token

	});

	is_veren.save().then(()=>{
		return token;
	});

}

var Isveren = mongoose.model('Isveren',IsverenSema)

var Isler = mongoose.model('Isler',IslerSema);
var Sofor = mongoose.model('Sofor',SoforSema);
var Arac  = mongoose.model('Arac' ,AracSema)


module.exports = {Sofor,Arac,Isler,Isveren};