var request = require('request')

 //var api_url = "http://localhost:3000/api";
var api_url = "https://mavimtruck.herokuapp.com/api";







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
            res.send(cevap)
        } else {
            res.send(cevap);
        }
    })
}

const soforLogin = function (req, res) {

    var sofor_cred = {
        email: req.body.email,
        sifre: req.body.sifre
    }

   

    var istekSecenekleri = {
        url: api_url +'/sofor/login',
        method: "POST",
        json: sofor_cred

    }
    
    request(istekSecenekleri, (hata, cevap, body) => {
        
        if (cevap.statusCode == 200) {
            var user ={
                ktipi:"sofor",
                id: body._id
            }
            req.session.user =user;
            console.log(user);
           
            res.redirect('/sofor/profil');
        } else if (cevap.statusCode == 401 ) {
            res.redirect('/login?hata=evet');
        } else if (cevap.statusCode == 404){
            res.send(cevap);
        }


    });


}

const soforGuncelleSayfasi = function (req,res){

    if (!req.session.user || req.session.user.ktipi == "isveren") {
        res.redirect('/login');
    }
    
    var id = {
        id: req.session.user.id

    }
    istekSecenekleri = {
        url : api_url + '/sofor',
        method : "GET",
        json : id
    }

    request(istekSecenekleri,(hata,cevap,sofor)=>{
        if(cevap.statusCode == 200){ 
            console.log("3423");
            console.log(sofor.arac);
            var ad_soyad= sofor.sofor.ad_soyad.split(" ");
            

            res.render('sofor-guncelle.ejs',{sofor,ad_soyad});   
        }else{
            res.send(sofor);
        }
           
    });

}


const soforGuncelle = function (req,res){
    
    if (!req.session.user || req.session.user.ktipi == "isveren") {
        res.redirect('/login');
    }

    var istekSecenekleri, yeniSofor,id;
    var id = req.session.user.id;

    yeniSofor = {
        id:id,        
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
        url: api_url + '/sofor/guncelle',
        method: "PATCH",
        json: yeniSofor
    }


    request(istekSecenekleri, (hata, cevap, body) => {
        if (cevap.statusCode ==200) {
            res.redirect('/sofor/profil');
        } else if (cevap.statusCode == 400) {
            console.log(body);
            res.send(body)
        } else {
            res.send(body);
        }
    })


}

const soforIsBul = function (req,res){

    if (!req.session.user || req.session.user.ktipi == "isveren") {
        res.redirect('/login');
    }
    var query = {
     id : req.session.user.id
    }
    
    
    var istekSecenekleri = {
        url : api_url + "/tumisler",
        method : "GET",
        json : query,
    }

    request(istekSecenekleri ,(hata, cevap, isler) => {
        if (cevap.statusCode == 200) {
            console.log(isler);
            res.render("butun-isler-liste.ejs", {
                isler
            });
        } else if (cevap.statusCode == 404) {
            res.send(body)
           
        } else if (cevap.statusCode === 400) {
            res.send(body)
        }
    });

}


const soforBasvur = function (req,res){

    if (!req.session.user || req.session.user.ktipi == "isveren") {
        res.redirect('/login');
    }

    var query = {
        sofor_id : req.session.user.id,
        is_id    : req.params.isid

    }
    
    
    var istekSecenekleri = {
        url : api_url + '/is/basvuru',
        method : "PATCH",
        json : query,
    }

    
    request(istekSecenekleri ,(hata, cevap, isler) => {
        if (cevap.statusCode == 200) {
            console.log(isler);
            res.send("İS KAYDOLDU")
        } else if (cevap.statusCode == 404) {
            res.send(isler)
           
        } else if (cevap.statusCode === 400) {
            res.send(isler)
        }
    });
}

module.exports = {
    soforKaydet,
    soforLogin,
    soforGuncelleSayfasi,
    soforGuncelle,
    soforIsBul,
    soforBasvur
}