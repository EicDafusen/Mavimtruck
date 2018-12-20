var request = require('request')

//var api_url = "http://localhost:3000/api"
var api_url = "https://mavimtruck.herokuapp.com/api";




const isVerenEkle = function (req, res) {

    var istekSecenekleri, yeniİsveren;

    yeniİsveren = {
        sirket_adi: req.body.sirketAdi,
        sifre: req.body.sirketSifre,
        telefon: req.body.sirketTelefon,
        vergi_no: req.body.vergiNo,
        sicil_no: req.body.sicilNo,
        e_posta: req.body.sirketMail,
        puan: 0
    }

    istekSecenekleri = {
        url: api_url + "/isveren/ekle",
        method: "POST",
        json: yeniİsveren

    }

    request(istekSecenekleri, (hata, cevap, body) => {
        if (cevap.statusCode == 201) {
            console.log(cevap);
            res.redirect('/');
        } else if (cevap.statusCode == 404) {
            console.log(cevap);
            res.redirect('/login')
        } else if (cevap.statusCode === 400) {
            res.redirect('/login')
        }
    })





}

const isVerenLogin = function (req, res) {

    var sirket_adi = req.body.sirket_adi;
    var sifre = req.body.sifre;

    var isveren_cred = {
        sirket_adi: req.body.sirket_adi,
        sifre: req.body.sifre
    }

    var istekSecenekleri = {
        url: api_url + '/isveren/login',
        method: "POST",
        json: isveren_cred
    }

    request(istekSecenekleri, (hata, cevap, body) => {
        console.log(body);

        if (cevap.statusCode == 200) {

            res.redirect('/');
        } else if (cevap.statusCode == 401) {
            res.send('sifre yanlis')
        } else {
            console.log(hata);
        }


    });





}

module.exports = {
    isVerenEkle,
    isVerenLogin
};