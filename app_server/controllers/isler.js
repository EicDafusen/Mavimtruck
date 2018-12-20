var request = require('request')

var api_url = "http://localhost:3000/api"


const isleriListele  = function(req,res){


    var istekSecenekleri;
    istekSecenekleri = {
        url : api_url + "/tumisler",
        method: "GET",
        json : {},
        qs   : {}
        
    }

    request(istekSecenekleri , function(hata,cevap,isler){
       
        if(!hata && isler.length){
            
            res.render("isler-liste-sayfa.ejs",{isler});
        }


    })


}




module.exports = {
    isleriListele
  
}