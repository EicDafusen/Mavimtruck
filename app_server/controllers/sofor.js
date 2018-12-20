var request = require('request')

var api_url = "http://localhost:3000/api"







const soforKaydet = function (req, res) {

    var istekSecenekleri, yeniSofor;

    yeniSofor = {

        soforAd: req.body.soforAd,
        soforSoyad: req.body.soforSoyad,
        soforTelefon: req.body.soforTelefon,
        soforMail: req.body.soforMail,
        soforSifre: req.body.soforSifre,
        lisanslar: [req.body.src3, req.body.src4, req.body.src5, req.body.k1, req.body.k2],

        aracMarka: req.body.aracMarka,
        aracModel: req.body.aracModel,
        aracKasaTipi: req.body.aracKasaTipi,
        aracKapasitesi: req.body.aracKapasitesi
    }

    istekSecenekleri = {
        url: api_url + '/sofor/kaydet',
        method: "POST",
        json: yeniSofor
    }


    request(istekSecenekleri, (hata, cevap, body) => {
        if (cevap.statusCode ==201) {
            console.log(cevap);
            res.redirect('/');
        } else if (cevap.statusCode == 400) {
            console.log(cevap);
            res.send('hata xd')
        } else {
            res.send('hata xd'+cevap);
        }
    })
}

const soforLogin = function (req, res) {

    var sofor_cred = {
        email: req.body.email,
        sifre: req.body.sifre
    }

    var istekSecenekleri = {
        url: api_url + '/sofor/login',
        method: "POST",
        json: sofor_cred

    }

    request(istekSecenekleri, (hata, cevap, body) => {
        if (cevap.statusCode == 200) {
            console.log(body);
            res.redirect('/');
        } else if (cevap.statusCode == 401) {

            res.redirect('/login')
        } else if (cevap.statusCode == 500) {
            res.send(body);
        } else {
            res.send(body);
        }
    });


}



module.exports = {
    soforKaydet,
    soforLogin
}