import Link from 'next/link'
import {auth} from '../firebase'

const Navbar = ({user}) => {
    return (
        <nav >
        <div className="nav-wrapper #fb8c00 orange darken-1">
          <Link href="/" ><a className="brand-logo">Nlogger</a></Link>
          <ul id="nav-mobile" className="right">
          {
            user? 
             <>
              <li><Link href="createblog"><a>Create Blog</a></Link></li>
              <li><button className="btn red" onClick={() => auth.signOut()}>Logout</button></li>
             </>           
            :
            <>
               <li><Link href="/signup"><a>SignUp</a></Link></li> 
               <li><Link href="/login"><a>Login</a></Link></li> 
            </>

          }            
          </ul>
        </div>
      </nav>
    )
}

export default Navbar
