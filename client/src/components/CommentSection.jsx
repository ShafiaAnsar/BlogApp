import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button, Textarea} from 'flowbite-react'
import { useState } from 'react'
const CommentSection = ({postId}) => {
    const [comment,setComment] = useState('')
    const {currentUser} = useSelector((state)=>state.user)
    const User = currentUser?.user ? currentUser?.user : currentUser
    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(comment.length > 200){
            return
        }
        const res = await fetch('api/comment/create',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                content:comment,
                postId, 
                userId:User._id
            })
        })
        const data = await res.json()
        if(res.ok){
            setComment('')
        }
    }
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
        { User ? (
                <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                    <p>Signed in as </p>
                    <img src={User.profilePicture} alt="" className="w-5 h-5 rounded-full object-cover" />
                    <Link className='text-xs text-cyan-600 hover:underline ' to={`/dashboard?tab=profile`}>
                        @{User.username}
                    </Link>
                </div>
            ):(
                <div className="text-sm text-teal-500 my-5 flex gap-1">
                    You must be signed in to comment
                    <Link className='text-blue-500 hover:underline' to="/signin">Login</Link>
                </div>
            )
        }
        {
            User && (
                <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3 '>
                    <Textarea onChange={(e)=> setComment(e.target.value)}  value={comment}  rows={3} maxLength={200} placeholder ='Add a comment...'/>
                    <div className="flex justify-between items-center mt-5">
                        <p className='text-gray-500 text-sm'> {200 - comment.length }remaining</p>
                        <Button outline gradientDuoTone={'purpleToBlue'} type='submit'>
                            Submit
                        </Button>
                    </div>
                </form>
            )
        }
    </div>
  )
}
CommentSection.propTypes={
    postId : PropTypes.string
}
export default CommentSection