import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'


function NavBar() {
  const {state,dispatch}=useContext(UserContext)
  const history=useHistory()
  const renderList=()=>{
    if(state){
   return [
    <li><Link to="/profile">Profile</Link></li>,

    <li><Link to="/create">Create post</Link></li>,
    <li><Link to="/myfollowingpost">My Following Posts</Link></li>,
    <li>
       <button onClick ={()=>{
         localStorage.clear()
         dispatch({type:"CLEAR"})
         history.push('/login')
       }} className="btn waves-effect waves-light  blue" >
    Logout
  </button>
    </li>

   ]
    }else{
    return [
      <li><Link to="/login">Login</Link></li>,
      <li><Link to="/signup">Signup</Link></li>
    ]
    }
  }
    return (
        <nav>
        <div className="nav-wrapper">
          <Link to={state?'/':'login'} className="brand-logo left">InstaClone</Link>
          <ul id="nav-mobile" className="right">
           {renderList()}
          </ul>
        </div>
      </nav>
    )
}

export default NavBar
