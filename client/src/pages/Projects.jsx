import {CalltoAction} from '../components'
const Projects = () => {
  return (
    <div className='min-h-screen flex justify-center items-center flex-col gap-6  px-3 max-w-2xl mx-auto'> 
      <h1 className='text-3xl font-semibold'>Projects</h1>
      <p className='text-md text-gray-500 '>Build fun and engaging projects to help you learn and grow. </p>
      <CalltoAction/>
    </div>
  )
}

export default Projects