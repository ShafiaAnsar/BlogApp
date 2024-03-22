import {useSelector} from 'react-redux'
import {Outlet,Navigate} from 'react-router-dom'
const AdminRoute = () => {
    const {currentUser} = useSelector((state)=>state.user)
    const User = currentUser?.user ? currentUser?.user : currentUser
  return User.isAdmin ? <Outlet/> : <Navigate to={'/signin'}/>
    
  
}

export default AdminRoute