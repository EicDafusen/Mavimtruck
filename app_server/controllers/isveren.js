var request = require('request')

 // var api_url = "http://localhost:3000/api"
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
            res.send(body)
        } else if (cevap.statusCode === 400) {
            res.send(body)
        }
        })





}

const isVerenLogin = function (req, res) {


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
        
        
        if (cevap.statusCode == 200) {
            var user ={
                ktipi:"isveren",
                id: body._id,
                ad: body.sirket_adi
            }
            req.session.user =user;
            res.redirect('/isveren/profil');
        } else if (cevap.statusCode == 401) {
            
            res.redirect('/login?hata=evet');
        } else {
            console.log(hata);
        }


    });





}

const isleriListele = function (req,res){

    
    if (!req.session.user || req.session.user.ktipi == "sofor") {
        res.redirect('/login');
    }

    var isveren_id = {id:req.session.user.id};

    var istekSecenekleri = {
        url : api_url + "/isveren/isler",
        method : "GET",
        json : isveren_id,
    }

    request(istekSecenekleri ,(hata, cevap, isler) => {
        if (cevap.statusCode == 200) {
            console.log(isler);
            res.render("isler-liste-sayfa.ejs", {
                isler,
                ad: req.session.user.ad
            });
        } else if (cevap.statusCode == 404) {
            res.send(body)
           
        } else if (cevap.statusCode === 400) {
            res.send(body)
        }
    });
 

}

const isVerenGuncelleSayfasi = function (req,res){

    if (!req.session.user || req.session.user.ktipi == "sofor") {
        res.redirect('/login');
    }
    
    var id = {
        id: req.session.user.id

    }
    istekSecenekleri = {
        url : api_url + '/isveren',
        method : "GET",
        json : id
    }

    request(istekSecenekleri,(hata,cevap,isveren)=>{
        if(cevap.statusCode == 200){ 
            res.render('isveren-guncelle.ejs',{isveren});   
        }else{
            res.send(isveren);
        }
           
    });
 


}

const isVerenGuncelle = function(req,res){

    if (!req.session.user || req.session.user.ktipi == "sofor") {
        res.redirect('/login');
    }
   
    
    yeniİsveren = {
        id:req.session.user.id,
        sirket_adi: req.body.sirketAdi,
        sifre: req.body.sirketSifre,
        telefon: req.body.sirketTelefon,
        vergi_no: req.body.vergiNo,
        sicil_no: req.body.sicilNo,
        e_posta: req.body.sirketMail,
    }

    istekSecenekleri = {
        url: api_url + "/isveren/guncelle",
        method: "PATCH",
        json: yeniİsveren

    }

    request(istekSecenekleri, (hata, cevap, body) => {
        if (cevap.statusCode == 200) {
            console.log(body);
            res.redirect('/isveren/profil');
        } else if (cevap.statusCode == 404) {
            console.log(body);
            res.redirect('/hata')
        } else if (cevap.statusCode === 400) {
            console.log(body);
            res.redirect('/hata')
        }
    })



}
module.exports = {
    isVerenEkle,
    isleriListele,
    isVerenLogin,
    isVerenGuncelleSayfasi,
    isVerenGuncelle
};