const router = require('express').Router()
const postController = require('../controllers/postController')

/* GET */
router.get('/',  postController.getPosts);
router.get('/:id', postController.getSinglePost);
router.get('/lists/:id', postController.getPostbyUserId);
router.post('/', postController.addPost)
router.delete('/:id', postController.deletePost);
router.put('/:id',  postController.updatePost);
router.put('/like/:id',  postController.likePost);
router.put('/unlike/:id',  postController.dislikePost);

module.exports = router;