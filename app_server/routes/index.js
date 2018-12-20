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
  res.render('login.ejs', {});
})


router.post('/isveren/uyeol', ctrlIsveren.isVerenEkle);
router.post('/sofor/uyeol',ctrlSofor.soforKaydet);

router.get('/kayitol',function (req, res, next) {
  res.render('kayit-ol.ejs', {});
});





router.get('/isler', ctrlIsler.isleriListele);



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