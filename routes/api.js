var express = require('express');
var router = express.Router();
var apiU=require('../controllers/api/api-user');
var apiC=require('../controllers/api/api-comic');
var apiComment=require('../controllers/api/api-comment');

/* GET home page. */

//get users
router.get('/users', apiU.listUsers);

//post users
router.post('/users', apiU.addUsers);
//update 
router.get('/users/edit/:iduser', apiU.listUsersUP);

router.put('/users/edit/:iduser', apiU.updateUsers);
//delete
router.put('/users/edit/:iduser', apiU.listUsers);
router.delete('/users/delete/:iduser', apiU.deleteUsers);

router.get('/comics', apiC.listComics);
router.post('/comics', apiC.addComics);
router.get('/comics/edit/:idcomic', apiC.listComicsUP);

router.put('/comics/edit/:idcomic', apiC.updateComics);
//delete
router.put('/comics/delete/:idcomic', apiC.listComicsUP);
router.delete('/comics/delete/:idcomic', apiC.deleteComics);
router.get('/chat', apiComment.getOneToOneConversations);
router.post('/chat', apiComment.addChat);
router.post('/chat/:chatId/messages', apiComment.addMessageToChat);
router.delete('/comments/delete/:idcomment', apiComment.deletecomment);


module.exports = router;