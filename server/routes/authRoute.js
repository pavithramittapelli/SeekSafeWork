const { Router } = require('express')
const authController = require('../controllers/authController')
const router = Router();

router.post('/signup', authController.signup_post)
router.get('/signup', authController.signup_get)
router.get('/login', authController.login_get)
router.post('/login', authController.login_post)
router.post('/logout', authController.logout_get)
router.get('/profile', authController.profile_get);

router.post('/workpost', authController.work_post);
router.get('/workpost', authController.post_get);
router.get('/myposts/:id', authController.myposts_get);
router.get('/getpost/:id', authController.getpost_get);
router.get('/getnotificatoinpost/:id/:userId', authController.getnotificatoinpost_get);
router.put('/editpost/:id', authController.editpost_put);
router.delete('/deletemypost',authController.mypost_delete)

router.post('/postBookmark', authController.postBookmark_post);
router.put('/removeBookmark',authController.removeBookmark_put)
router.get('/myBookmarks/:id', authController.myBookmarks_get)

router.get('/upvoteAndDownvote/:cardId',authController.upvoteAndDownVote_get)
router.put('/updateUpvote', authController.upvote_put);
router.put('/updateDownvote', authController.downvote_put);
// router.get('/clearcookie',authController.clearCookie)

router.get('/notification/:id', authController.notification_get);
router.get('/clearNotificatoins/:id',authController.clearNotificatoins)

router.get('/sendOtp/:email', authController.sendOtp_get)
router.get('/verifyOtp/:otp', authController.verifyOtp_get)

module.exports = router;