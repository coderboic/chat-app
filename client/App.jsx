import { useEffect ,useState} from "react";
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
    <div className="min-h-screen bg-gradient-to-r from-violet-500 to-fuchsia-400 flex items-center justify-center">
    {!username ? (
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Enter your Name to Join Chat</h2>
        <div className="flex flex-col sm:flex-row items-center">
          <input 
            className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto mb-3 sm:mb-0 sm:mr-2"
            value={tempUsername} 
            onChange={(e)=>setTempUsername(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key == "Enter") setUsername(tempUsername);
            }}
          />
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
            onClick={()=> setUsername(tempUsername)}>
            Join Chat
          </button>
        </div>
      </div>
    ):(
      <div className="p-5 bg-white rounded-lg shadow-md max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-3">Hello, {username}</h2>
        <div className="border border-gray-300 h-[300px] overflow-y-scroll p-2.5 mb-2.5">
          {chat.map((msg,i)=>(
            <div key={i} className="mb-1">
              <strong className="font-semibold">{msg.user}:</strong>{msg.message}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            className="border border-gray-300 rounded px-2 py-1 flex-grow mr-2"
            value={message}
            onChange={(e)=> setMessage(e.target.value)}
            onKeyDown={handleEnter}
            placeholder="Type your message..." 
          />
          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={sendMessage}>Send</button>
        </div>
      </div>
    )}
    </div>
  );
  }

export default App;
