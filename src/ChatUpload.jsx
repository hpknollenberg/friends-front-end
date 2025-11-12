import { useContext, useState } from "react"
import { AuthContext, UserContext, NewMessageContext } from "./context"
import { createMessage, getMessages } from "./api"
import { v4 as uuidv4 } from "uuid"


const ChatUpload = ({socket}) => {
    const { auth } = useContext(AuthContext)
    const { user, setUser } = useContext(UserContext)
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")
    const [ fileKey, setFileKey ] = useState(uuidv4())
    const { newMessage, setNewMessage } = useContext(NewMessageContext)


    let sendSocket = async () => {
        return socket.current.send("ping")
    }

    const sendMessage = () => {
        if (content.trim() != "" || image != "") {
            sendSocket()
            .then(response => {
                createMessage({auth, user, content, image})
                .then(response => {  
                    setContent("")
                    setFileKey(uuidv4())
                    setImage("") 
                })
            })
        }
    }

    
    return (
        <div style={{backgroundColor: "rgba(75, 0, 205, 0.5)", height: "fit-content", border: "solid", boxShadow: "5px 5px 10px black"}} className="col-lg-5 col-12 ms-lg-2 ms-0 mt-lg-0 mt-2 d-flex flex-column align-items-end">
            <textarea value={content} className="mt-2 w-100" onChange={e => setContent(e.target.value)}></textarea>
            <div className="d-flex justify-content-end">
                <input key={fileKey} className="mt-3 w-75" type="file" accept='image/*' onChange={e => setImage(e.target.files[0])} />
            </div>
            <button className="mt-3 mb-3" onClick={() => sendMessage()}>Send Message</button>    
        </div>
    ) 
}

export default ChatUpload