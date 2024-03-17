 import { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import {DashboardSidebar,Profile} from '../components'
const Dashboard = () => {
  const location = useLocation()
  const [tab,setTab] = useState('')
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl =urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* Sidebar */}
      <div className="md:w-1/4">
        <DashboardSidebar/>
      </div>
      {/* Content */}
      <div className="md:w-3/4">
        {
          tab === 'profile' ? <Profile/> : <div>Dashboard</div>
        }
      </div>
    </div>
  )
}

export default Dashboard