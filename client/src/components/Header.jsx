/* eslint-disable react/no-unescaped-entities */
import {Avatar, Button, Dropdown, Navbar, TextInput} from 'flowbite-react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon ,FaSun} from 'react-icons/fa'
import { toggleTheme } from '../redux/theme/themeSlice'
import {useSelector,useDispatch} from 'react-redux'
import {signoutSuccess} from '../redux/user/userSlice'
import { useEffect, useState } from 'react'
const Header = () => {
    const navigate = useNavigate()
    const {currentUser} = useSelector((state)=>state.user)
    const  User = currentUser?.user ? currentUser?.user : currentUser
    const [searchTerm, setSearchTerm] = useState('')
    const location = useLocation()
    const dispatch = useDispatch()
    const {theme} = useSelector(state => state.theme)
    const path = useLocation().pathname
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl =urlParams.get('searchTerm')
        if(searchTermFromUrl){
          setSearchTerm(searchTermFromUrl)
        }
    },[location.search])
    const handleSignout = async ()=>{
        try {
          const res = await fetch ('/api/user/signout', {
            method: 'POST'})
            const data = await res.json()
            if(!res.ok){
              console.log(data.message)
            }
            else(
              dispatch(signoutSuccess())
            )
        } catch (error) {
          console.log(error.message)
        }
      }
      const handleSubmit = (e) => {  
        e.preventDefault()
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
      }
  return (
    <Navbar className='border-b-2 px-2'>
        <Link to={'/'} className='self-center whitespace-nowrap text-sm sm:text-xl  font-semibold dark:text-white'>
            <span className='px-2 py-1 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white mr-1'>Shafia's</span>
            Blog
            
        </Link>
        <form onSubmit={handleSubmit} className='mt-3 sm:mt-0'>
        <TextInput
         type='text'
         placeholder='Search...'
         rightIcon={AiOutlineSearch}
         className='inline '
         value={searchTerm}
         onChange={(e)=>setSearchTerm(e.target.value)}
        />
        </form>
        <div className="flex gap-x-2 m-2 items-start sm:mt-0 md:order-2 ">
        <Button onClick={()=>dispatch(toggleTheme())} className='w-12 h-10  inline ' color='gray' pill>
            {theme === 'light'?<FaMoon/> : <FaSun/>}
            
        </Button>
        {currentUser ? (
            <Dropdown arrowIcon={false}  inline 
            label={
                <Avatar img={User?.profilePicture} rounded={true} alt='user'/>
            }
            >
                <Dropdown.Header>
                    <span className='block text-sm'>{User?.username}</span>
                    <span className='block text-sm font-medium truncate'>{User?.email}</span>
                </Dropdown.Header>
                <Link to={'/dashboard?tab=profile'}>
                <Dropdown.Item>
                    Profile
                </Dropdown.Item>
                </Link>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={handleSignout}>
                    Sign out
                </Dropdown.Item>
            </Dropdown>
        )
        :(
         <Link to={'signin'}>
         <Button gradientDuoTone={'purpleToBlue'} outline>
             Sign In
         </Button>
     </Link>)
        }
       
        <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path === '/' } className='' as={'div'}>
                <Link to={'/'}>
                    Home
                </Link>
            </Navbar.Link >
            <Navbar.Link active={path === '/about'} as={'div'}>
                <Link to={'/about'}>
                    About
                </Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/projects'} as={'div'}>
                <Link to={'/projects'}>
                    Projects
                </Link> 
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header