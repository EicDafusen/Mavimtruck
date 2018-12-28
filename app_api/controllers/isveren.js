const mongoose = require('mongoose');


const {
    Isveren 
} = require('../models/semalar');

const {
    Isler
} = require('../models/semalar');



const cevapOlustur = function (res, status, content) {
    res
        .status(status)
        .json(content);
};



const isVerenEkle = function (req, res) {




    var isveren = new Isveren({
        sirket_adi: req.body.sirket_adi,
        sifre: req.body.sifre,
        telefon: req.body.telefon,
        vergi_no: req.body.vergi_no,
        sicil_no: req.body.sicil_no,
        e_posta: req.body.e_posta,
        puan: 0
    });



    isveren.save(isveren)
        .then(() => {

            res.status(201).send(isveren);
            console.log(isveren);

        }, (e) => {
            cevapOlustur(res, 400, e);
        })
}

const isVerenLogin = function (req, res) {

    var s_adi = req.body.sirket_adi;
    var s_sifre = req.body.sifre;


    Isveren.find({
        sirket_adi: s_adi,
        sifre: s_sifre
    }).then((isveren) => {
        console.log(isveren);
        if (isveren[0]) {


            res.status(200).send(isveren[0]);

        } else {
            res.status(401).send("is _ sfire yanlis");
        }

    }, (e) => {

        res.status(400).send("server hatasi");
    });



}

const isvereninIsleri = function (req, res) {



    console.log(req.body.id)
    Isler.find({
        is_veren_id: req.body.id
    }).then((isler) => {

        cevapOlustur(res, 200, isler);
    }, (e) => {
        cevapOlustur(res, 400, e);
    });

}

const isVerenGuncelle = function (req, res) {



        var id = req.body.id;

    var yeni_isveren = {
        sirket_adi: req.body.sirket_adi,
        sifre: req.body.sifre,
        telefon: req.body.telefon,
        vergi_no: req.body.vergi_no,
        sicil_no: req.body.sicil_no,
        e_posta: req.body.e_posta
    }



    Isveren.findOneAndUpdate({_id:id},{$set:yeni_isveren},{new:true}).then((isveren)=>{
        
        console.log("--")
        console.log(isveren);
        if(isveren){
            res.status(200).send(isveren);
        }else{
            res.status(404).send({});
        }

    },(e)=>{
        res.status(400).send(e);
    })
}

const isVerenBul = function(req,res){

    var id = req.body.id;

    Isveren.findById(id).then((isveren)=>{
        if(isveren){
            res.status(200).send(isveren);
        }else {
            res.status(404).send({});
        }
    },(e)=>{
        res.status(400).send(e);
    })


}




module.exports = {
    isVerenEkle,
    isvereninIsleri,
    isVerenLogin,
    isVerenBul,
    isVerenGuncelle
    
};