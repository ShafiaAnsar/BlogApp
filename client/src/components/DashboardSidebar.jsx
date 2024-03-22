import { Sidebar } from "flowbite-react"
import { useEffect, useState } from "react"
import {HiArrowSmRight, HiUser} from 'react-icons/hi'
import { Link, useLocation } from "react-router-dom"
import { signoutSuccess } from "../redux/user/userSlice"
import { useDispatch } from "react-redux"
const DashboardSidebar = () => {
  const dispatch = useDispatch()
    const location = useLocation()
    const [tab,setTab] = useState('')
    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl =urlParams.get('tab')
      if(tabFromUrl){
        setTab(tabFromUrl)
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
  return (
    <Sidebar className="w-full">
        <Sidebar.ItemGroup>
            <Link to={'/dashboard?tab=profile'}>
                <Sidebar.Item className={'cursor-pointer'} active={tab==='profile'} as='div'  icon={HiUser} label={'User'} labelColor="dark" >
                    Profile
                </Sidebar.Item>
          </Link>
          <Sidebar.Item className={'cursor-pointer'}  icon={HiArrowSmRight} onClick={handleSignout} >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
    </Sidebar>
  )
}

export default DashboardSidebar