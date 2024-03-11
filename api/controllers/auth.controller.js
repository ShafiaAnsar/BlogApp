import User from '../modal/user.modal.js'
import bcryptjs from 'bcryptjs'
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