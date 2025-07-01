import React,{ useEffect, useState } from 'react'
import {useDispatch} from "react-redux"
import './App.css'
import authService from './appwrite/auth';
import {login,logout} from "./store/authSlice"
import {Footer, Header} from "./components/index"
import { Routes, Route} from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home'
import AllPost from './pages/AllPost'
import EditPost from './pages/EditPost'
import AddPost from './pages/AddPost'
import ProtectedAuthLayout from './components/ProtectedAuthLayout'
import Post from './pages/Post';
function App() {
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login(userData))
      } else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  },[])

  return !loading ? 
    <div className = "w-screen min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className = "w-full block">
        <Header/>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<ProtectedAuthLayout authentication = {false}><Login /></ProtectedAuthLayout>} />
          <Route path="/signup" element={<ProtectedAuthLayout authentication = {false}><SignUp /></ProtectedAuthLayout>} />
          <Route path="/all-posts" element={<ProtectedAuthLayout authentication> {" "}<AllPost /></ProtectedAuthLayout>} />
          <Route path="/add-post" element={<ProtectedAuthLayout authentication> {" "}<AddPost /></ProtectedAuthLayout>} />
          <Route path="/edit-post/:slug" element={<ProtectedAuthLayout authentication> {" "}<EditPost /></ProtectedAuthLayout>} />
          <Route path="/post/:slug" element={<Post />}/>
        </Routes>
        <Footer/>
      </div>
    </div>
  : null;
}

export default App;
