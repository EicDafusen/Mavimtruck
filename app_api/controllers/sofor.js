const mongoose = require('mongoose');

const {
    Sofor
} = require('../models/semalar');
const {
    Arac
} = require('../models/semalar');


const cevapOlustur = function (res, status, content) {
    res
        .status(status)
        .json(content);
};


const getAllSoforler = function (req, res) {




    var sofor = new Sofor({
        ad_soyad: "lul",
        telefon: "23232",
        eposta: "xd",
        sifre: "iksde",

        lisanslar: ["xd", "lul"],
        puan: 5

    });

    sofor.save(sofor).then((sofor) => {
        cevapOlustur(res, 200, {
            "mesaj": sofor
        });

    }, (e) => {
        cevapOlustur(res, 400, {
            "mesaj": "istekte mekanid yok"
        });
    });

}

const postYeniSofor = function (req, res) {
    //Once arac ve soforlerin nesnelerini oluşturuyoruz
    var arac = new Arac({

        marka: req.body.aracMarka,
        model: req.body.aracModel,
        kasa_tipi: req.body.aracKasaTipi,
        max_agirlik: req.body.aracKapasitesi


    });

    var sofor = new Sofor({

        ad_soyad: req.body.soforAd + " " + req.body.soforSoyad,
        telefon: req.body.soforTelefon,
        eposta: req.body.soforMail,
        sifre: req.body.soforSifre,
        lisanslar: req.body.lisanslar,

    });

    //idsi lazım olduğu için önce arac'ı db'ye kaydediyoruz
    arac.save(arac).then((arac) => {

        //olusturduğumuz yeni sofor nesnesine yeni aracin idsini ekliyoruz ve kaydediyoruz
        sofor.arac_id = arac._id;
        sofor.save(sofor).then((sofor) => {
            res.status(201).send(sofor);
            //hata durumunda 400 ile hata mesajını yollıyacak
        }, (e) => {
            res.status(400).send(e);
        });
        //hata durumunda 400 ile hata mesajını yollıyaca
    }, (e) => {

        res.status(400).send(e);
    });





}

const soforLogin = function (req, res) {
    

    var email = req.body.email;
    var sifre = req.body.sifre;

    console.log(email + " " + sifre)

    Sofor.find({
        eposta: email,
        sifre: sifre
    }).then((sofor) => {
        
        if (sofor[0]) {
            
            res.status(200).send(sofor[0]);

        } else {
            res.status(401).send("is _ sfire yanlis");
        }

    }, (e) => {
        res.status(400).send(e);
    })


}

const soforBul = function ( req,res){

    var id = req.body.id;
    var g_sofor = {
        sofor :{},
        arac: {}
    }

    Sofor.findOne({_id:id}).then((sofor)=>{
        
        if(sofor){
            g_sofor.sofor = sofor;
            
            Arac.findOne({_id:sofor.arac_id}).then((arac)=>{
                if(arac){
                    g_sofor.arac = arac;
                    res.status(200).send(g_sofor);
                }else {
                    res.status(404).send({});
                }
            })
            
        }else {
            res.status(404).send({});
        }
    },(e)=>{
        res.status(400).send(e);
    })


}


const soforGuncelle = function (req,res){

    var id = req.body.id;
    var arac = {

        marka: req.body.aracMarka,
        model: req.body.aracModel,
        kasa_tipi: req.body.aracKasaTipi,
        max_agirlik: req.body.aracKapasitesi


    }

    var sofor = {

        ad_soyad: req.body.soforAd + " " + req.body.soforSoyad,
        telefon: req.body.soforTelefon,
        eposta: req.body.soforMail,
        sifre: req.body.soforSifre,
        lisanslar: req.body.lisanslar,

    }
     
    Sofor.findOneAndUpdate({_id:id},{$set:sofor},{new:true}).then((sofor)=>{
      
        if(sofor){
         
             Arac.findOneAndUpdate({_id:sofor.arac_id},{$set:arac},{new:true}).then((arac)=>{

                if(arac){
                    res.status(200).send({sofor,arac});
                }else{
                    res.status(404).send({});    
                }

             },(e)=>{
                res.status(400).send(e);
             })
        }else{
            res.status(404).send({});
        }


    },(e)=>{
        res.status(400).send(e);
    })


}

module.exports = {
    getAllSoforler,
    postYeniSofor,
    soforLogin,
    soforBul,
    soforGuncelle
};