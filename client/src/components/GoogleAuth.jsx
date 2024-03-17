import { Button } from "flowbite-react"
import {AiFillGoogleCircle} from 'react-icons/ai'
import  {useDispatch} from 'react-redux'
import {GoogleAuthProvider,signInWithPopup,getAuth} from 'firebase/auth'
import {signInSuccess} from '../redux/user/userSlice'
import  {useNavigate } from 'react-router-dom'
import {app} from '../firebase'
const GoogleAuth = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = getAuth(app)
    const handleClick = async ()=>{
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt :'select_account'})
        try {
          const result=  await signInWithPopup(auth,provider)
          const res = await fetch('/api/auth/google',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
              name:result.user.displayName,
              email:result.user.email,
              photoUrl:result.user.photoURL
            })
          })
          const data = await res.json()
          console.log(data)
          if (res.ok){
            dispatch(signInSuccess(data))
            navigate('/')
          }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Button type="button" gradientDuoTone='pinkToOrange' outline onClick={handleClick}>
        <AiFillGoogleCircle className="w-6 h-6 mr-2"/>
        Continue with Google
    </Button>
  )
}

export default GoogleAuth