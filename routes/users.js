const router = require('express').Router()
const userController = require('../controllers/userControllers')


router.get('/',  userController.getUsers);
router.post('/register', userController.registerUsers);
router.post('/login', userController.loginUsers);

module.exports = router;