var express = require('express');
var router = express.Router();

var ctrlIsler = require('../controllers/isler');
var ctrlIsveren = require('../controllers/isveren');
var ctrlSofor = require('../controllers/sofor');


//APP SERVER


/*ANA SAYFA */
router.get('/', function (req, res, next) {
  res.render('index.ejs', {
    title: 'Express'
  });
});


router.post('/isveren/login', ctrlIsveren.isVerenLogin);
router.post('/sofor/login', ctrlSofor.soforLogin);

router.get('/login',function (req, res, next) {
  if(req.query.hata && req.query.hata == "evet"){
    res.render('login.ejs', {hata : "evet"});
  }else {
    res.render('login.ejs', {});
  }

  
})


router.post('/isveren/uyeol', ctrlIsveren.isVerenEkle);
router.post('/sofor/uyeol',ctrlSofor.soforKaydet);

router.get('/kayitol',function (req, res, next) {
  res.render('kayit-ol.ejs', {});
});


router.post('/is/olustur',ctrlIsler.isEkle);
router.get('/is/olustur',function (req, res, next) {

  if(!req.session.user || req.session.user.ktipi == "sofor"){
    res.redirect('/login');
  }
  res.render('is-olustur.ejs', {});
});
router.get('/is/sil/:isid',ctrlIsler.isSil)


router.get('/isveren/isler', ctrlIsveren.isleriListele);
router.get('/isveren/basvurular/:isid', ctrlIsveren.isVerenBasvurular);
router.get('/isveren/reddet/:isid/:soforid', ctrlIsveren.basvuruReddet);
router.get('/isveren/kabulet/:isid/:soforid', ctrlIsveren.basvuruyuKabulEt);

router.get('/isveren/guncelle', ctrlIsveren.isVerenGuncelleSayfasi);
router.post('/isveren/guncelle', ctrlIsveren.isVerenGuncelle);

router.get('/sofor/guncelle',ctrlSofor.soforGuncelleSayfasi);
router.post('/sofor/guncelle',ctrlSofor.soforGuncelle);


router.get('/isveren/profil',function (req, res, next) {

  if(!req.session.user || req.session.user.ktipi == "sofor"){
    res.redirect('/login');
  }
  res.render('isveren-profil.ejs', {});
});

router.get('/sofor/profil',function (req, res, next) {

  if(!req.session.user || req.session.user.ktipi == "isveren"){
    res.redirect('/login');
  }
  res.render('sofor-profil.ejs', {});
})

router.get('/sofor/isbul',ctrlSofor.soforIsBul)
router.get('/sofor/basvuru/:isid',ctrlSofor.soforBasvur)

router.get('/cikisyap',function (req, res, next) {

  req.session.destroy();
  res.redirect('/')
});


router.get('/profil',function (req, res, next) {

  if(!req.session.user ){
    res.redirect('/login');
  }

  if(req.session.user.ktipi == "sofor"){
    res.redirect('/sofor/profil');
  }else if (req.session.user.ktipi == "isveren"){
    res.redirect('/isveren/profil');
  }else{
    res.redirect('/login');
  }
   

});
module.exports = router;


//** ÇÖP KUTUSU */

/** ISVEREN UYE OL */
/* 
router.get('/isveren/uyeol', function (req, res, next) {
  res.render('isveren-uye-ol.ejs', {});
});
*/


/** ISVEREN LOGIN */
/*
router.get('/isveren/login', function (req, res, next) {
  res.render('isveren-login.ejs', {});
});*/

/** SOFOR LOGIN !! DENENMEDI !!  */
/*router.get('/sofor/login', function (req, res, next) {
  res.render('sofor-login.ejs', {});
});*/


/** SOFOR UYE OL 
router.get('/sofor/uyeol', function (req, res, next) {
  res.render('sofor-uye-ol.ejs', {});
}); */