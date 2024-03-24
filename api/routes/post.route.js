import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { create, deletePost, getposts, updatePost } from '../controllers/post.controller.js'

const router = express.Router()

router.get('/getposts', getposts)
router.post('/create', verifyToken, create)
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost)       
router.put('/updatepost/:postId/:userId', verifyToken,updatePost)
export default router