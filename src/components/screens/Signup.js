import React ,{useState,useEffect} from 'react'

import {Link,useHistory} from "react-router-dom"
import M from 'materialize-css'
function Signup() {
  const history=useHistory();

  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");

  const[image,setImage]=useState("")
  const[url,setUrl]=useState(undefined)

  useEffect(()=>{
    if(url){
        uploadFields()
    }
},[url])

  const uploadPic = ()=>{
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","chinmey")
    fetch("https://api.cloudinary.com/v1_1/chinmey/image/upload",{
        method:"post",
        body:data
    })
    .then(res=>res.json())
    .then(data=>{
      
       setUrl(data.url)
    })
    .catch(err=>{
        console.log(err)
    })

    
  }

  const uploadFields=()=>{
    fetch("/Signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        password,
        pic:url
      })}).then(res=>res.json())
      .then(data=>{
        if(data.err)
        M.toast({html: "error in aving user",classes:"red darken-2"})
        else{
          M.toast({html:"success",classes:"green lighten-1"})
          history.push("/login")
          window.location.reload()

        }
      })
    
  


  }
   const PostData=()=>{
    if(image){
      uploadPic()
  }else{
      uploadFields()
  }
   }
    return (
        <div className="mycard">
         <div className="card auth-card">
   <h2>InstaClone</h2>
   <input type="text" placeholder="name"
    value={name} onChange={(e)=>setName(e.target.value)}/>
   <input type="text" placeholder="email"
    value={email} onChange={(e)=>setEmail(e.target.value)}/>
   
   <input type="password" placeholder="password"
    value={password} onChange={(e)=>setPassword(e.target.value)}/>  
       <div className="file-field input-field">
      <div className="btn blue">
        <span>Upload Image</span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
   <button onClick={()=>PostData()} className="btn waves-effect waves-light  blue" >
    SignUp
  </button>
  <h5>
  <Link to="/login">Already Registered?</Link>
  </h5>  </div>

      </div>
        
    )
}

export default Signup
