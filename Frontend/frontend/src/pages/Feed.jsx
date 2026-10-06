import {useState, useEffect}from 'react'
import axios from "axios"


const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const Feed = () => {
   const[posts, setPosts] = useState([
    {
        _id:'1',
         image: "https://ik.imagekit.io/rywmrbxuw/image_la95E-v5e.jpg",
        caption: "test",
    } ])
  useEffect(()=>{
    axios.get(`${API}/posts`)
    .then((res)=>{
      setPosts(res.data.posts)
    })
  },[])
  const handleDelete = (id) => {
 axios.delete(`${API}/posts/${id}`)
    .then(() => {
      setPosts(posts.filter((post) => post._id !== id))
    })
    .catch((err) => {
      console.log(err)
      alert('Error deleting post')
    })}
  return (
    <div>
      <section className="feed-section">
        {
          posts.length> 0?(
            posts.map((post)=>(
              <div key={post._id} className='post-card' >
               <img src={post.image} alt={post.caption} />
               <p>{post.caption}</p>
                 <button onClick={() => handleDelete(post._id)}>Delete</button>
               </div>
            ) )
         ):(
          <h1>No  posts available</h1>
         )
        }
</section>
    </div>
  )
}

export default Feed
