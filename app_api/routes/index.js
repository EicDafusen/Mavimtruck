
var express=require('express');
var router=express.Router();


var ctrlSofor=require('../controllers/sofor');
var ctrlIs=require('../controllers/is');
var ctrlIsveren = require('../controllers/isveren');

/* SOFOR */
router
.route('/soforler')
.get(ctrlSofor.getAllSoforler);

router
.route('/sofor/kaydet')
.post(ctrlSofor.postYeniSofor);

router
.route('/sofor/login')
.post(ctrlSofor.soforLogin);

router
.route('/sofor')
.get(ctrlSofor.soforBul);

router
.route('/sofor/guncelle')
.patch(ctrlSofor.soforGuncelle);

router
.route('/sofor/sil')
.delete(ctrlSofor.soforSil);

router
.route('/sofor/basvurular')
.get(ctrlSofor.soforBasvurular);


/* IS */
router
.route('/is/kaydet')
.post(ctrlIs.isKaydet);


router
.route('/tumisler')
.get(ctrlIs.getTumIsler);

router
.route('/is/sil')
.delete(ctrlIs.isSil);

router
.route('/is/basvuru')
.patch(ctrlIs.iseBasvuru);

/* ISVEREN */

router
.route('/isveren/ekle')
.post(ctrlIsveren.isVerenEkle);

router
.route('/isveren/login')
.post(ctrlIsveren.isVerenLogin);

router
.route('/isveren/isler')
.get(ctrlIsveren.isvereninIsleri);

router
.route('/isveren')
.get(ctrlIsveren.isVerenBul);

router
.route('/isveren/guncelle')
.patch(ctrlIsveren.isVerenGuncelle);

router
.route('/isveren/basvurular')
.get(ctrlIsveren.isVerenBasvurular);

router
.route('/isveren/basvuruyutamamla')
.delete(ctrlIsveren.isVerenBasvuruyuTamamla);

router
.route('/isveren/sil')
.delete(ctrlIsveren.isverenSil);


module.exports=router;