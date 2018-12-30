var request = require('request')

 
var api_url = "http://localhost:3000/api"
 //  var api_url = "https://mavimtruck.herokuapp.com/api";



const isleriListele = function (req, res) {

    var istekSecenekleri;
    istekSecenekleri = {
        url: api_url + "/tumisler",
        method: "GET",
        json: {},
        qs: {}

    }

    request(istekSecenekleri, function (hata, cevap, isler) {

        if (!hata && isler.length) {

            res.render("isler-liste-sayfa.ejs", {
                isler
            });
        }


    })


}

const isEkle = function (req,res) {

    if(!req.session.user){
        res.redirect('/login')
    }else{
        var isveren_id = req.session.user.id;
        var isveren_ad = req.session.user.ad;
    }
     
    var yeniIs = {

        is_veren_id: isveren_id,
        isveren_ad:isveren_ad,
        ilan_basligi : req.body.ilan_basligi, 
        son_basvuru_tarihi: req.body.son_basvuru_tarihi,
        kasa_tipi: req.body.arac_kasa_tipi,
        max_agirlik: req.body.arac_kapasitesi,
        fiyat : req.body.is_fiyati,
        is_tarihi:req.body.is_tarihi,
        gerekli_lisanslar: [req.body.src3, req.body.src4, req.body.src5, req.body.k1, req.body.k2],
        yuk_cinsi:req.body.yuk_cinsi,
        hareket_yeri:req.body.hareket_yeri,
        varis_yeri:req.body.varis_yeri,
        is_suresi:req.body.is_suresi,
        
    };
    console.log(yeniIs);

    console.log(isveren_id);
    
    var istekSecenekleri = {
        url : api_url + "/is/kaydet",
        method : "POST",
        json  : yeniIs
    }

    request(istekSecenekleri,(hata, cevap, body)=>{
        console.log(cevap.statusCode);
        if (cevap.statusCode ==201) {
            console.log(cevap);
            res.redirect('/isveren/profil')
        } else if (cevap.statusCode == 400 || cevap.statusCode == 404 || cevap.statusCode == 401 ) {
            console.log(body);
            res.send(body)
        } else {
            console.log(body);
            res.send(hata);
        }


    })

}



module.exports = {
    isleriListele,
    isEkle

}