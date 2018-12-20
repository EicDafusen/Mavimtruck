const mongoose = require('mongoose');

const {
    Isveren
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

            return isveren.tokenOlustur();

        })
        .then((token) => {
            res.status(201).header('x-auth', token).send(isveren);

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

            res.status(200).send(isveren);

        } else {
            res.status(401).send("is _ sfire yanlis");
        }

    }, (e) => {

        res.status(400).send("server hatasi");
    });



}

module.exports = {
    isVerenEkle,
    isVerenLogin
};