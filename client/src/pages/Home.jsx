import {Link} from 'react-router-dom'
import {CalltoAction,PostCard} from '../components'
import { useEffect, useState } from 'react'
import { Spinner } from 'flowbite-react'
const Home = () => {
  const [posts,setPosts] = useState([])
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
   const fetchPosts = async()=>{
    try {
      setLoading(true)
      const res = await fetch('/api/post/getposts')
    const data = await res.json()
    if(res.ok){
      setLoading(false)
      setPosts(data.posts)
    
    }
    } catch (error) {
      console.error(error.message)
      setLoading(false)
    }
   } 
   fetchPosts()
  },[])
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl ">Welcome to my Blog</h1>
        <p className="text-gray-500 text-sm "> Here you will find a variety of articles and resources to help you learn and build such as JavaScript and React framework and more. </p>
        <Link to={'/search'} className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
        View all posts
      </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CalltoAction/>
      </div>
      <div className="flex flex-col  gap-8 p-3 py-7 max-w-6xl  mx-auto">
        {
          posts && (
            <div className="flex flex-col w-full gap-6">
              <h2 className='text-2xl font-semibold text-center '>Recent Posts</h2>
              <div className="w-full flex items-center justify-center">
              {loading && <Spinner size={"xl"}/>}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
               
            {

              posts.map(post => <PostCard key={post._id} post={post}/>)
            }
            </div>
            <Link to={'/search'} className='text-lg text-center text-teal-500 hover:underline'>
            View all posts
            </Link>
            </div>
          )
        }
        </div>
    </div>
  )
}

export default Home