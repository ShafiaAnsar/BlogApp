import { useEffect, useState } from "react"
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Table} from 'flowbite-react'
const Posts = () => {
  const {currentUser} = useSelector((state)=>state.user)
  const User = currentUser?.user ? currentUser?.user : currentUser
  const [userPosts,setUserPosts] = useState([])
  console.log(userPosts.posts)
  useEffect(()=>{
    const fetchPosts = async()=>{
      try{
      const res = await fetch(`/api/post/getposts?userId=${User._id}`)
      const posts = await res.json()
     if(res.ok){
      setUserPosts(posts)
    }

    }
    catch(error){
      console.log(error)
    }
    }
    if(User.isAdmin){
      fetchPosts()
    }
  },[User._id,User.isAdmin])
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300  dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {
        User.isAdmin && userPosts?.posts?.length > 0 ?(
          <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>
                Data updated
              </Table.HeadCell>
              <Table.HeadCell>
               Post image
              </Table.HeadCell>
              <Table.HeadCell>
                Post title
              </Table.HeadCell>
              <Table.HeadCell>
                Category
              </Table.HeadCell>
              <Table.HeadCell>
                Delete
              </Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
            {userPosts.posts.map((post,index)=>(
              
                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date (post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                    <img src={post.image} alt="post image" className="w-20 h-10 object-cover bg-gray-500"/>
                    </Link>
                    
                  </Table.Cell>
                  <Table.Cell>
                    <Link className="font-medium text-gray-900 dark:text-white" to={`/post/${post.slug}`}>
                      {post.title}
                      </Link>
                  </Table.Cell>
                  <Table.Cell>
                    {post.category}
                  </Table.Cell>
                  <Table.Cell>
                      <span className="font-medium text-red-500 hover:underline cursor-pointer">Delete</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className="text-teal-500 hover:underline" to={`/update-post/${post._id}`}>
                    <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
            ))}
             </Table.Body>
          </Table>
          </>
        )
        :(
          <div>You have no posts yet</div>
        )

      }
    </div>
  )
}

export default Posts 