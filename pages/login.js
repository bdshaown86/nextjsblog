import {useState} from 'react'
import Link from 'next/link'
import {auth} from '../firebase'

function login() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

const handleSubmit = async(e) => {
  e.preventDefault()
  try {
    const result = await auth.signInWithEmailAndPassword(email,password)
  
    M.toast({html: `Welcome ${result.user.displayName }`,classes:"green"})    
  } catch (err) {
    M.toast({html: err.message,classes:"red"})   
  }
}

    return (
        <div className="container center">
           <h1>Please login</h1> 
           <form onSubmit={(e) => handleSubmit(e)}>
               <div className="input-field">
                   <input type="email" placeholder="Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                   />
                   <input type="password" placeholder="Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                   />
               </div>
               <button type="submit" className="btn #fb8c00 orange darken-1"> Login</button>
               <Link href="/signup"><a><h5>Dont have an Account?</h5></a></Link>
           </form>
        </div>
    )
}

export default login
