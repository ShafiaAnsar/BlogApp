import { Alert, Button, TextInput } from "flowbite-react"
import { useEffect, useRef, useState } from "react"
import {  useSelector } from "react-redux"
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
const Profile = () => {
    const {currentUser} = useSelector(state=>state.user)
    const [imageFile,setImageFile] = useState(null)
    const [imageUrl,setImageUrl] = useState(null)
    const [imageProgress,setImageProgress]= useState(null)
    const [imageUploadError,setImageUploadError] = useState(null)
    console.log(imageProgress)
    console.log(imageUploadError)
    const filePickerRef = useRef()
    const handleImageChange = (e)=>{
      const file = e.target.files[0]
      setImageFile(file)
      setImageUrl(URL.createObjectURL(file))
    }
    const uploadImage=()=>{
      const storage = getStorage(app)
      const fileName = new Date().getTime() + imageFile.name
      const storageRef = ref(storage,fileName)
      const uploadTask = uploadBytesResumable(storageRef,imageFile)
      uploadTask.on(
        'state_changed',
        (snapshot)=>{
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
          setImageProgress(progress.toFixed(0))
        },
        (error)=>{
          setImageUploadError('Could not Upload Image(File must be less than 2MB)')
          console.log(error)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
            setImageUrl(downloadUrl)
          })
        }
      )
    }
    useEffect(()=>{
      if(imageFile){
        uploadImage()
      }
    },[imageFile])

  return (
    <div className="p-5 flex  flex-col items-center justify-center">
        <h1 className="my-4 text-center font-semibold text-3xl">Profile</h1>
        <form className="flex flex-col w-full gap-y-4 px-12">
          <input type="file" accept="image/*" hidden onChange={handleImageChange} ref={filePickerRef}/>
            <div className="sm:w-32 sm:h-32  w-24 h-24 self-center my-4 shadow-md overflow-hidden rounded-full" onClick={()=>filePickerRef.current.click()}>
            <img src={ imageUrl || currentUser?.user.profilePicture} alt="user" className="rounded-full cursor-pointer w-full h-full border-8 border-[lightgray] object-cover "  />
            </div>
            {
              imageUploadError && 
              <Alert color='failure'>
                {imageUploadError}
              </Alert>
            }
            <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser?.user.username} />
            <TextInput type="email" id="email" placeholder="email" defaultValue={currentUser?.user.email} className=" truncate" />
            <TextInput type="password" id="password" placeholder="Password" />
            <Button type="submit" gradientDuoTone={'purpleToBlue'} >Update</Button>
        </form>
        <div className="flex flex-wrap gap-4 items-center justify-center   dark:text-red-500 text-white  m-5 ">
          <span className="dark:bg-white bg-red-500  px-3 py-2 rounded-md cursor-pointer  ">Delete</span>
          <span className="dark:bg-white bg-red-500 rounded-md p-2 cursor-pointer">Sign Out</span>
        </div>
    </div>
  )
}

export default Profile