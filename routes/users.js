var express = require('express');
var router = express.Router();
var usercontroller =require('../controllers/users.controller');

/* GET users listing. */
router.get('/',usercontroller.list);
// router.get('/add',check_login.request_login,usercontroller.addUser)
// router.post('/add',check_login.request_login,usercontroller.addUser);
// router.get('/edit/:iduser',check_login.request_login,usercontroller.editUser);
// router.post('/edit/:iduser',check_login.request_login,usercontroller.editUser);
// router.get('/delete/:iduser',check_login.request_login,usercontroller.deleteUser);
router.get('/sortusername',usercontroller.sortuser);
router.get('/sortemail',usercontroller.sortuseremail);
// router.get('/sortrole',check_login.request_login,usercontroller.sortuserrole);
module.exports = router;
