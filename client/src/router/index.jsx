import { Route, Routes } from "react-router-dom"
import {Home, About, Projects, SignUp, SignIn, Dashboard, CreatePost, UpdatePost, PostPage, SearchPage} from '../pages'
import { AdminRoute, PrivateRoute } from "../components"
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/projects" element={<Projects/>}/>
      <Route path="/post/:postSlug" element={<PostPage/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/search" element={<SearchPage/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path="/dashboard" element={<Dashboard/>}/>
      </Route>
      <Route element={<AdminRoute/>}>
        <Route path="/create-post" element={<CreatePost/>}/>
        <Route path="/update-post/:postId" element={<UpdatePost/>}/>
      </Route>
    </Routes>
  )
}

export default Router