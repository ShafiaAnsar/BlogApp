import {Link,useNavigate} from 'react-router-dom'
import {Button, Label, TextInput,Alert,Spinner} from 'flowbite-react'
import { useState } from 'react'
const SignIn = () => {
  const navigate = useNavigate()
  const [formdata,setFormData]= useState({})
  const [errorMessage,setErrorMessage] =useState(null)
  const [loading,setLoading] = useState(false)
  const handleChange = (e)=>{
  setFormData({...formdata,[e.target.id]:e.target.value.trim()})
  }
  console.log(formdata)
  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(!formdata.username || !formdata.email || !formdata.password){
      setErrorMessage("All fields are required")
    }
    try{
      setLoading(true)
      setErrorMessage(null)
      const response = await fetch('/api/auth/signin',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
          body:JSON.stringify(formdata)
      })
      const data = await response.json()
      if(data.success === false){
        setErrorMessage(data.message)
      }
      setLoading(false)
      if(response.ok){
        navigate('/')
      }
    }
    catch(error){
      setErrorMessage(error.message)
      setLoading(false)
    }
  }
  return (

    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
        <Link to={'/'} className=' text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white mr-1'>Shafia's</span>
            Blog
        </Link>
        <p className='text-sm mt-5'>Login to write and read blogs in your own way </p>

        </div>
        {/* right */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div >
              <Label value='Your Email'/>
              <TextInput className='mt-2'  onChange={handleChange} id='email' type='email' placeholder='name@gmail.com' />
            </div>
            <div>
              <Label value='Your Password'/>
              <TextInput className='mt-2' onChange={handleChange} id='password' type='password' placeholder='Password' />
            </div>
            <Button gradientDuoTone={'purpleToPink'} type='submit' disabled={loading} >
              {loading ? (
                <>
                <Spinner size='sm' />
                  <span>
                    Loading...
                  </span></>
              ) : "Sign In"}
            </Button>
          </form>
          <p className='text-sm mt-5'>Donot  have an account? <Link to={'/signup'} className='text-blue-500'>Sign Up</Link></p>
          {
          errorMessage && 
          <Alert className='mt-5' color='failure'>
            {errorMessage}
            </Alert>
        }
        </div>
       
      </div>

    </div>
  )
}

export default SignIn