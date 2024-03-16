import User from '../modal/user.modal.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.js'
export const signup = async (req,res,next)=>{
    const {username, email,password } = req.body

    if(!email || !password || !username || username === '' || password === '' || email === ''){
        next(errorHandler(400,'All fields are required'))
    }
    const hashedPassword = bcryptjs.hashSync(password,10)

    const newUser = new User(
        {
            username, email, password:hashedPassword 
        }
    )
    const user = User.findOne({email,username})
    if(user){
        next(errorHandler(400,'User already exists'))
    }
    try{

    await newUser.save()
    res.json({message:"Success"})
    }
    catch(err){
        next(err)        
    }
}

export const signin = async(req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password || email === '' || password === ''){
        next(errorHandler(400,'All fields are required'))
    }
    try {
        const user = await User.findOne({email})
    if(!user){
        return next(errorHandler(404,'User not found'))
    }
    const isMatch = bcryptjs.compareSync(password,user.password)
    if(!isMatch){
       return next(errorHandler(400,'Wrong credentials'))
    }
    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        { expiresIn:'1d'} )
    res.status(200).cookie('access_token',token,{
        httpOnly:true
    }).json({message:"SignIn Success"})
    } 
    catch (error) {
        next(error)
    }
}