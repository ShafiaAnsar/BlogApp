import { Button, TextInput } from "flowbite-react"
import {  useSelector } from "react-redux"
const Profile = () => {
    const {currentUser} = useSelector(state=>state.user)
  return (
    <div className="p-5 flex  flex-col items-center justify-center">
        <h1 className="my-4 text-center font-semibold text-3xl">Profile</h1>
        <form className="flex flex-col w-full px-12">
            <div className="sm:w-32 sm:h-32  w-24 h-24 self-center my-4 shadow-md overflow-hidden rounded-full">
            <img src={currentUser?.user.profilePicture} alt="user" className="rounded-full cursor-pointer w-full h-full border-8 border-[lightgray] object-cover "  />
            </div>
            <TextInput type="text" id="username" placeholder="username" value={currentUser?.user.username} className="my-2 " />
            <TextInput type="email" id="email" placeholder="email" value={currentUser?.user.email} className="my-2 truncate" />
            <TextInput type="password" id="password" placeholder="Password" />
            <Button type="submit" gradientDuoTone={'purpleToBlue'} >Update</Button>
            <Button color="failure" className="my-2">Delete</Button>
        </form>
    </div>
  )
}

export default Profile