import {db} from '../../firebase';
import {useState} from 'react'
import {useRouter} from 'next/router'

export default function blogpage({blog,user,allComments}) {
    const [myComment,setMyComment] = useState("")
    const [allCommentsBlog,setAllComments] = useState(allComments)
    const router = useRouter()
    const {blogid} = router.query;
    // console.log("Rs:",blog)
    const makeCommet = async ()=>{
       
        await db.collection('blogs').doc(blogid).collection('comments').add({
             text:myComment,
             name:user.displayName
         })
        const commentQuery = await db.collection('blogs').doc(blogid).collection('comments').get()
        setAllComments(commentQuery.docs.map(docSnap=>docSnap.data()))

     }

    return (
        <div className="container center">
            <h1>{blog.title}</h1>
            <h5>Created on: {new Date(blog.createdAt).toDateString()}</h5>
            <img src={blog.imageUrl} alt={blog.title} />
            <p>{blog.body}</p>
        {
          user ?
          <>            
            <div className="input-field">
                <input type="text" placeholder="add a comment"
                 value={myComment} onChange={(e) => setMyComment(e.target.value)}
                />
            </div>
            <button className="btn #fb8c00 orange darken-1"
             onClick={makeCommet}
            >Make Comment</button>
          </>
          :

          <h3>Please login to make comments</h3>
        }

            <hr />
        <div>
            {
             allCommentsBlog.map(item=>{
              return <h6 key={item.name}><span>{item.name}: </span>{item.text}</h6>
             })
            }
        </div>

     <style jsx global>
    {`
     body{
         color: orange;
         background: red;
     }
     img{
         width: 100%;
         max-width: 500px;
     }
    `}
     </style>
        </div>
    )
}

export async function getServerSideProps({params:{blogid}}) {
  
  const result = await db.collection('blogs').doc(blogid).get()
  const allCommentsSnap = await db.collection('blogs').doc(blogid).collection('comments').get()

const allComments = allCommentsSnap.docs.map(comDocSnap => comDocSnap.data())
 
    
      return {
        props: {
            blog:{
                ...result.data(),
                createdAt: result.data().createdAt.toMillis()
            },
            allComments
        }, 
      }
    }
