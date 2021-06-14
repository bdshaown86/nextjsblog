import {useState,useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {db, storage,serverTimestamp} from '../firebase'

function createblog({user}) {
const [title,setTitle] = useState('')
const [body,setBody] = useState('')
const [image,setImage] = useState('')
const [url,setUrl] = useState('')

useEffect(() => {
try {
    if(url){
        db.collection("blogs").add({
            title,
            body,
            imageUrl: url,
            postedBy : user.uid,
            createdAt: serverTimestamp()
        })
        M.toast({html: "Blog post created",classes:"green"})
    
      }  
} catch (err) {
    M.toast({html:"Error creating blog",classes:"red"}) 
}

},[url])

const submitDetails = ( ) => {
    if(!title || !body || !image){
        return M.toast({html: "Please add all fields",classes:"red"})  
    }
    var uploadTask = storage.ref().child(`images/${uuidv4()}`).put(image);
    uploadTask.on('state_changed', 
    (snapshot) => { 
      
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if(progress == '100') M.toast({html: "Image Uploaded",classes:"green"})  
 
    }, 
    (error) => {
      // Handle unsuccessful uploads
      M.toast({html: error.message,classes:"red"})
    }, 
    () => {
    
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        setUrl(downloadURL)
      });
    }
  );
}

    return (
        <div className="input-field rootdiv">
            <h3>Create A blog</h3>
          <input type="text" placeholder="Title..."
           value={title}
           onChange={(e) => setTitle(e.target.value)}
          />   
           <textarea type="text" placeholder="Body..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
           />
           <div className="file-field input-field">
               <div className="btn orange">
                 <span>File</span>
                 <input type="file" onChange={(e) => setImage(e.target.files[0])} />
               </div>
               <div>
                 <input type="text" className="file-path validate"/>
               </div>
           </div>

           <button className="btn #fb8c00 orange darken-1" onClick={() => submitDetails()}> Submit</button>
           
        <style jsx>
         {`
          .rootdiv{
              margin:30px auto;
            //   background: red;
              max-width: 600px;
              padding: 20px;
              text-align: center
          }
         ` }
             
        </style>  
        </div>
      
    )
}

export default createblog
