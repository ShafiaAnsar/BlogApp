import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Alert, Button, Textarea} from 'flowbite-react'
import { useEffect, useState } from 'react'
import Comment from './Comment'
const CommentSection = ({postId}) => {
    const [comment,setComment] = useState('')
    const [postComments,setPostComments] = useState([])
    const [error,setError] = useState(null)
    const {currentUser} = useSelector((state)=>state.user)
    const User = currentUser?.user ? currentUser?.user : currentUser
    useEffect(() => {
        const getComments = async () => {
          try {
            const res = await fetch(`/api/comment/getPostComment/${postId}`);
            if (res.ok) {
              const data = await res.json();
              setPostComments(data);
            }
          } catch (error) {
            console.log(error.message);
          }
        };
        getComments();
      }, [postId]);
    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(comment.length > 200){
            return
        }
        try {
            const res = await fetch('/api/comment/create',{
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
            console.log(data)
            if(res.ok){
                setComment('')
                setError(null)
                setPostComments([data,...postComments])
            }

        } catch (error) {
            setError(error.message)
        }
        
    }
    console.log(postComments)
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
                    { error && 
                        <Alert color={'failure'} className='mt-5'>
                        {error}
                        </Alert>
                    }
                   
                </form>
            
            )
        }
        {
            postComments.length === 0 ?(
                <p className='text-gray-500 text-sm mt-5'>No comments yet! </p>
            ):(
                <>
                <div className="text-sm flex items-center gap-2 my-5">
                    <p>Comments</p>
                    <div className="border border-gray-400 py-1 px-2 rounded-sm ">
                        <p>{postComments.length}</p>
                    </div>
                </div>
               { postComments.map((comment) => {
                    return(
                    <Comment key={comment._id} comment={comment}/>)
                })
                
                }
                </>

            )
        }
    </div>
  )
}
CommentSection.propTypes={
    postId : PropTypes.string
}
export default CommentSection