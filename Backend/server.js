require("dotenv").config();
const mongoose= require('mongoose');
const app=require('./src/app');

async function connectDB(){
    await mongoose.connect(process.env.MONGO_URI)
    console.log('db conneted')
}

connectDB()
  .then(() => {
   app.listen(3000, () => {
      console.log("server running on port 3000");
    });
  })
  .catch((err) => {
    console.log("db error:", err.message);
  });


module.exports = connectDB;