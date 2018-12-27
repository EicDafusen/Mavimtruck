const mongoose = require('mongoose');

const {Isler} = require('../models/semalar');


const cevapOlustur = function (res,status,content) {
    res
      .status(status)
      .json(content);
  };



const isKaydet = function(req,res){

    
    var yeniIs = new Isler({
 
        is_veren_id: req.body.is_veren_id ,
        isveren_ad:req.body.isveren_ad,
        ilan_basligi : req.body.ilan_basligi, 
        son_basvuru_tarihi: req.body.son_basvuru_tarihi,
        kasa_tipi: req.body.kasa_tipi,
        max_agirlik: req.body.max_agirlik,
        fiyat:req.body.fiyat,
        is_tarihi:req.body.is_tarihi,
        gerekli_lisanslar: req.body.gerekli_lisanslar,
        yuk_cinsi:req.body.yuk_cinsi,
        hareket_yeri:req.body.hareket_yeri,
        varis_yeri:req.body.varis_yeri,
        is_icin_verilen_sure:req.body.is_suresi,
        
        basvuranlar: null
    });
    

    yeniIs.save(yeniIs).then((kaydedilenIs)=>{
      
        res.status(201).send(kaydedilenIs)
    },(e)=>{
        res.status(400).send(e);
        
    });


}


const getTumIsler = function(req,res){

   Isler.find({}).then((isler)=>{
      
    cevapOlustur(res,200,isler);
   },(e)=>{
    cevapOlustur(res,400,e);   
   });

}

const iseBasvuru = function(req,res){

   var sofor_id = req.body.sofor_id;
   var is_id    = req.body.is_id;





}

module.exports={
    isKaydet,
    getTumIsler
};