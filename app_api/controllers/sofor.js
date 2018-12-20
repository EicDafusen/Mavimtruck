const mongoose = require('mongoose');

const {Sofor} = require('../models/semalar');
const {Arac} = require('../models/semalar');


const cevapOlustur = function (res,status,content) {
  res
    .status(status)
    .json(content);
};




const getAllSoforler = function(req,res){

      
    
    
    var sofor = new Sofor({
    	ad_soyad:"lul",
    telefon:"23232",
    eposta:"xd",
    sifre:"iksde",
 
	lisanslar:["xd" , "lul"],
	puan:5

    });

    sofor.save(sofor).then((sofor)=>{
    	cevapOlustur(res, 200, {
		"mesaj": sofor
	    });

    },(e)=>{
    	cevapOlustur(res, 400, {
		"mesaj": "istekte mekanid yok"
	     });
    });

}

const postYeniSofor= function(req,res){
     //Once arac ve soforlerin nesnelerini oluşturuyoruz
     var arac = new Arac({
 
            marka :      req.body.aracMarka,
            model  :     req.body.aracModel,
            kasa_tipi :  req.body.aracKasaTipi,
            max_agirlik :req.body.aracKapasitesi


        });

      var sofor =  new Sofor({
             
            ad_soyad : req.body.soforAd+" "+req.body.soforSoyad,
            telefon :  req.body.soforTelefon,
            eposta  :  req.body.soforMail,
            sifre   :  req.body.soforSifre, 
            lisanslar: req.body.lisanslar,

        });

       //idsi lazım olduğu için önce arac'ı db'ye kaydediyoruz
       arac.save(arac).then((arac)=>{

            //olusturduğumuz yeni sofor nesnesine yeni aracin idsini ekliyoruz ve kaydediyoruz
            sofor.arac_id = arac._id;
            sofor.save(sofor).then((sofor)=>{
                res.status(201).send(sofor);
            //hata durumunda 400 ile hata mesajını yollıyacak
            },(e)=>{
                 cevapOlustur(res, 400, {
                 "mesaj": e
                });
       });
          //hata durumunda 400 ile hata mesajını yollıyaca
       },(e)=>{
            cevapOlustur(res, 400, {
            "mesaj": e
         });
       });


       

       
}

const soforLogin = function(req,res){

   var email = req.body.email;
   var sifre = req.body.sifre;

   console.log(email + " "+sifre)

   Sofor.find({
       eposta : email,
       sifre : sifre
   }).then((sofor)=>{
    console.log(sofor);
    if (sofor[0]) {
        console.log(sofor);
        res.status(200).send(sofor);

    } else {
        res.status(401).send("is _ sfire yanlis");
    }

   },(e)=>{
    res.status(400).send(e); 
   })


}












module.exports={
getAllSoforler,
postYeniSofor,
soforLogin
 };