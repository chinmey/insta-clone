import React ,{useState,useContext} from 'react'
import {Link,useHistory} from "react-router-dom"
import M from 'materialize-css'
import {UserContext} from '../../App'


function Login() {

  const {state,dispatch}=useContext(UserContext)
  const history=useHistory();

  
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");
  
   const PostData=()=>{
     fetch("/signin",{
       method:"post",
       headers:{
         "Content-Type":"application/json"
       },
       body:JSON.stringify({
         
         email,
         password
       })}).then(res=>res.json())
       .then(data=>{
         console.log(data)
         if(data.err)
         M.toast({html: data.err,classes:"red darken-2"})
         else{
           localStorage.setItem("jwt",data.token)
           localStorage.setItem("user",JSON.stringify(data.user))
           dispatch({type:"USER",payload:data.user})
           M.toast({html:"success",classes:"green lighten-1"})
           history.push("/")

         }
       })
     
   }
    return (
        <div className="mycard">
         <div className="card auth-card">
   <h2>InstaClone</h2>
   <input type="text" placeholder="email"
    value={email} onChange={(e)=>setEmail(e.target.value)}/>
   
   <input type="password" placeholder="password"
    value={password} onChange={(e)=>setPassword(e.target.value)}/> 
   <button onClick ={()=>PostData()} className="btn waves-effect waves-light  blue" >
    Login
  </button> 
  <h5>
  <Link to="/signup">Not Registered?</Link>
  </h5>
        </div>

      </div>
        
    )
}

export default Login
