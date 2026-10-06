import axios from "axios"
import {useNavigate} from "react-router-dom"

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const CreatePost = () => {
     const navigate = useNavigate()
    const handleSubmit= async (e)=>{
       e.preventDefault() 
    const formData= new FormData(e.target)
    
    axios.post(`${API}/create-post`, formData)
     .then(()=>{
         navigate("/")
        })
     .catch((err)=>{
        console.log(err)
        alert('Error creating post')
     })
    }
  return (
   <>
    <section className="create-post-section">
        <h1>create post</h1>

        <form onSubmit={handleSubmit}>
            <input type="file" name="image" accept="image/*" />
            <input type="text" name="caption" placeholder="Enter Caption" required/>
            <button type="submit">submit</button>
            
        </form>
    </section>
   </>
  )}
export default CreatePost
