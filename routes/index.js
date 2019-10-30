var express = require('express');
var router = express.Router();
// Đưa model vào
var contactModel = require('../models/contact');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Xem dữ liệu. */
router.get('/xem', function(req, res, next) {
  contactModel.find({}, function(err, dulieu) {
    res.render('xem', { title: 'Xem Dữ liệu', data: dulieu });
  })
});

/* GET Xóa dữ liệu. */
router.get('/xoa/:idcanxoa', function(req, res, next) {
  var id = req.params.idcanxoa;
  contactModel.findByIdAndRemove(id).exec() //exec: Thuc thi
  res.redirect('/xem'); 
});

/* GET Sửa dữ liệu. */
router.get('/sua/:idcansua', function(req, res, next) {
  var id2 = req.params.idcansua;
  contactModel.find({_id: id2}, function(err, dulieu){
    res.render('sua', {datasua: dulieu, title: "Sua du lieu"});
  })
});
/* POST lấy dữ liệu sửa */
router.post('/sua/:idcansua', function(req, res, next) {
  var id2 = req.params.idcansua;
  // Dựa và id, tên tuổi truyền từ view
  contactModel.findById(id2, function (err, dulieu){
    if (err) return handleError(err);
    dulieu.ten = req.body.ten;
    dulieu.tuoi = req.body.tuoi;
    dulieu.save();
    res.redirect('/xem');
  })
});

/* GET Thêmdữ liệu. */
router.get('/them', function(req, res, next) {
  contactModel.find({}, function(err, dulieu) {
    res.render('them', { title: 'Theem Dữ liệu' });
  })
});
/* POST Thêmdữ liệu. */
router.post('/them', function(req, res, next) {
  var phantu = {
    ten: req.body.ten,
    tuoi: req.body.tuoi
  }
  var dulieu = new contactModel(phantu);
  dulieu.save();
  res.redirect('/xem')
});


module.exports = router;
