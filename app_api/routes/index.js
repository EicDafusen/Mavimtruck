
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

/* IS */
router
.route('/iskaydet')
.get(ctrlIs.isKaydet);


router
.route('/tumisler')
.get(ctrlIs.getTumIsler);



/* ISVEREN */

router
.route('/isveren/ekle')
.post(ctrlIsveren.isVerenEkle);

router
.route('/isveren/login')
.post(ctrlIsveren.isVerenLogin);

module.exports=router;