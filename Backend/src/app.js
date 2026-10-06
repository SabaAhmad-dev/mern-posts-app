const express= require('express');
const multer = require('multer');
const cors= require("cors");
const postModel = require('../models/post.model');
const uploadFile = require('../services/storage.service.js').default;

const app= express();
app.use(cors())
app.use(express.json())

const upload= multer({storage: multer.memoryStorage()})

app.get('/',(req,res)=>{
   res.json('hello saba')
})

app.post('/create-post', upload.single('image'), async (req, res) => {
    const result = await uploadFile(req.file.buffer)

    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption
    })

    res.json({ message: 'post created', post })
})

app.get("/posts", async(req,res)=>{
    
   const posts= await postModel.find();

   res.json({message:"post fetched",posts})
})


app.delete('/posts/:id', async (req, res) => {
    const id = req.params.id

    await postModel.findByIdAndDelete(id)

    res.json({ message: 'post deleted' })
})

module.exports= app;