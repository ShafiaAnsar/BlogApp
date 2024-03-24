import {Alert, Button, FileInput, Select, TextInput} from "flowbite-react"
import { useState } from "react"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import {app} from '../firebase'
import {CircularProgressbar } from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css'
import { useNavigate } from "react-router-dom"
const CreatePost = () => {
    const navigate = useNavigate()
    const [formData,setFormData] = useState({})
    const [file,setFile] = useState(null)
    const [imageUploadProgress,setImageUploadProgress] = useState(null)
    const [imageUploadError,setImageUploadError] = useState(null)
    const [publishError,setPublishError] = useState(null)
    console.log(formData)
    const handleUploadImage = async () => {
        try {
            if(!file){
                setImageUploadError('Please select an image')
                return
            }
            setImageUploadError(null)
            const storage = getStorage(app)
            const fileName = new Date().getTime() + '-' + file.name
            const storageRef = ref(storage,fileName)
            const uploadTask = uploadBytesResumable(storageRef,file)

            uploadTask.on('state_changed',snapshot=>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setImageUploadProgress(progress.toFixed(0))
            },error=>{
                console.log(error)
                setImageUploadError('Could not upload image (File must be less than 2MB)')
                setImageUploadProgress(null)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    setFormData({...formData,image:downloadURL})

                    setImageUploadError(null)
                    setImageUploadProgress(null)
                    setFile(null)
                })
            }
            )
        }catch (error) {
           setImageUploadError('Could not upload image (File must be less than 2MB)')
           setImageUploadProgress(null)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch ('/api/post/create',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
            )
            const data = await res.json()
            console.log(data)
            if(!res.ok){
                setPublishError(data.message)
                return
            }
            if(res.ok){
                setPublishError(null)
                navigate(`/post/${data.slug}`)
            }
        } catch (error) {
            setPublishError('Could not publish post')
        }
    }
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <TextInput type="text"
                onChange={(e)=> setFormData({...formData, title:e.target.value})}
                 placeholder="Title " required id="title" className="flex-1" />
                <Select onChange={(e)=> setFormData({...formData, category:e.target.value})} >
                    <option value='uncategorized'>Select a category</option>
                    <option value="javascript">JavaScript</option>
                    <option value='reactjs'>ReactJs</option>
                    <option value={'nextjs'}>NextJs</option>
                </Select>
            </div>
            <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                <FileInput type="file"  accept="image/*" onChange={(e)=>setFile(e.target.files[0])} />
                <Button type="button" gradientDuoTone={'purpleToBlue'} outline onClick={handleUploadImage} disabled={imageUploadProgress}  size={'sm'}>
                {
                    imageUploadProgress ? (
                        <div className="w-16 h-16">
                        <CircularProgressbar value={imageUploadProgress} maxValue={100} text={`${imageUploadProgress}% `|| 0} />
                        </div>
                    ):(
                        'Upload Image'
                    )
                }
                </Button>
            </div>
            {
                imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>
            }
            {
                formData?.image && (
                    <img src={formData.image }
                    alt="upload"
                    className="w-full h-72 object-cover"
                    />
                )
            }
            <ReactQuill theme="snow" placeholder="Write something..." onChange={(value)=> setFormData({...formData, content:value})} required className="h-72 mb-12" />
            <Button type="submit" gradientDuoTone={'purpleToPink'}>Publish</Button>
            {
                publishError && <Alert className="mt-5" color='failure'>{publishError}</Alert>
            }
        </form>
    </div>
  )
}

export default CreatePost