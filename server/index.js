const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
require("dotenv").config();

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  }).then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const messageSchema=new mongoose.Schema({
    user:String,
    message:String,
    timeStamp:{type: Date,default:Date.now}
})
const Message=mongoose.model("Message",messageSchema);

app.get("/messages", async function(req, res) {
    const messages = await Message.find().sort({timeStamp:1}); 
    res.json(messages);
})
app.post("/messages", async function(req, res) {
    const { user, message } = req.body;
    const newMsg = new Message({ user, message });
    await newMsg.save();
    res.status(201).json(newMsg);
});
app.listen(5000,()=>{
    console.log("server is running on port 5000");
})