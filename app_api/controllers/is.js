const mongoose = require('mongoose');

const {Isler} = require('../models/semalar');


const cevapOlustur = function (res,status,content) {
    res
      .status(status)
      .json(content);
  };



const isKaydet = function(req,res){


    var d = new Date();
    var yeniIs = new Isler({

        is_veren_id: null ,
        son_basvuru_tarihi: d.getDate(),
        kasa_tipi: "kasa_tipi",
        max_agirlik: 3000,
        is_tarihi:d.getDate(),
        gerekli_lisanslar: ["lis","sans"],
        yuk_cinsi:"yuk cinsi",
        hareket_yeri:"bura",
        varis_yeri:"ora",
        is_icin_verilen_sure:"çok",
        basvuranlar: null
    });


    yeniIs.save(yeniIs).then((kaydedilenIs)=>{
        cevapOlustur(res,200,kaydedilenIs);
    },(e)=>{
        cevapOlustur(res,400,{
            "mesaj": e
           });
    });


}


const getTumIsler = function(req,res){

   Isler.find({}).then((isler)=>{
      
    cevapOlustur(res,200,isler);
   },(e)=>{
    cevapOlustur(res,400,e);   
   });

}

module.exports={
    isKaydet,
    getTumIsler
};