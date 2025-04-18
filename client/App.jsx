import { useEffect, useState } from "react";
import axios from "axios";

import "tailwindcss";
const API_URL="http://localhost:5000/messages"
function App(){
  const [username,setUsername]=useState("");
  const [tempUsername,setTempUsername]=useState("");
  const [message,setMessage]=useState("");
  const [chat,setChat]=useState([]);
  useEffect(()=>{
    const fetchMessages=async function(){
      const res=await axios.get(API_URL);
      setChat(res.data);
    };
    fetchMessages();
    const interval=setInterval(fetchMessages,2000);
    return function fun(){
      clearInterval(interval);
    }
  },[]);
  const sendMessage=async()=>{
    if(!message.trim()){
      return;
    }
    await axios.post(API_URL,{
      user:username,
      message,
    });
    setMessage("");
  };
  const handleEnter=(e)=>{
    if(e.key == "Enter"){
      sendMessage();
    }
  }
  return(
    <div className="min-h-screen bg-[#0e0f1a] text-white font-['Inter'] flex items-center justify-center p-5" >
    {!username ? (
      <div className="text-center space-y-4 bg-[#1a1b2e] p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold mb-8" >Enter your Name to Join Chat</h2>
        <div className="flex flex-col space-y-2">
          <input
            value={tempUsername} 
            onChange={(e)=>setTempUsername(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key == "Enter") setUsername(tempUsername);
            }}
            placeholder="Your Name "
            className="px-4 py-2 rounded-md bg-[#2e2f3f] text-white w-full focus:outline-none"
          />
          <button className=" bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"onClick={()=> setUsername(tempUsername)}>
            Join Chat
          </button>
        </div>
      </div>
    ):(
      <div className="w-full max-w-2xl bg-[#1a1b2e] rounded-2xl shadow-xl p-6 mt-4"  >
        <h2 className="text-2xl font-semibold text-center">Hello, {username}</h2>
        <h2 className=" text-lg font-medium">Chats</h2>
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 ">
          {chat.map((msg,i)=>(
            <div key={i} className="bg-[#232435] px-3 py-2 rounded-md">
              <span className="font-semibold text-blue-400">{msg.user}:  <span className="text-gray-200">{msg.message}</span></span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={message}
            onChange={(e)=> setMessage(e.target.value)}
            onKeyDown={handleEnter}
            placeholder="Type your message..." 
            className="flex-1 px-4 py-2 rounded-md bg-[#2e2f3f] text-white focus:outline-none"
          />
          <button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-r-lg px-4 py-2 transition-colors duration-300 focus:outline-none focus:ring-none focus:ring-blue-500 shadow-md">Send</button>
        </div>
      </div>
    )}
    </div>
  );
  }

export default App;