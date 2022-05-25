const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/posts');
const multer = require('multer'); // multer helps clients to upload images & process photo files, then to AWS!!!
const upload = multer(); // AWS now involved
/*---------- Public Routes ----------*/
// CRUD ROUTES : create, read, delete
router.post('/', isAuthorized, upload.single('photo'), postsCtrl.create);
router.get('/', postsCtrl.index);
router.delete('/:id', postsCtrl.deletePost);

/*---------- Protected Routes ----------*/
function isAuthorized(req, res, next){
    console.log("made to routes")
    if(req.user){
        return next()
    }else{
        res.status(401).json({message: 'Not Authorized'})
    }
}
module.exports = router;