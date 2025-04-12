import { useEffect ,useState} from "react";
import axios from "axios";

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
  if(! username){
    return(
      <div style={{ padding : 20}}>
      <h2>Enter your name</h2>
      <input 
        value={tempUsername} onChange={(e)=>setTempUsername(e.target.value)}
        onKeyDown={(e)=>{
          if(e.key == "Enter") setUsername(tempUsername);
        }}
        />
        <button onClick={()=> setUsername(tempUsername)}>Join Chat</button>
        </div>
    );
  }
  return(
    <div style={{ padding: 20}}>
      <h2>Hello , {username}</h2>
      <div 
        style={{
          border:"1px solid gray",
          height:300,
          overflowY:"scroll",
          padding:10,
          marginBottom:10,
        }}
        >
          {chat.map((msg,i)=>(
            <div key={i}>
              <strong>{msg.user}:</strong>{msg.message}
        </div>
        ))}
    </div>
    <input
       value={message}
       onChange={(e)=> setMessage(e.target.value)}
       onKeyDown={handleEnter}
       placeholder="Type your message..." 
    />
    <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default App;