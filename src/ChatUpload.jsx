import { useContext, useState } from "react"
import { AuthContext, UserContext } from "./context"
import { createMessage, getMessages } from "./api"
import { v4 as uuidv4 } from "uuid"


const ChatUpload = ({newMessages, setNewMessages}) => {
    const { auth } = useContext(AuthContext)
    const { user, setUser } = useContext(UserContext)
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")
    const [ fileKey, setFileKey ] = useState(uuidv4())


    const sendMessage = () => {
        if (content.trim() != "" || image != "") {
            createMessage({auth, user, content, image})
            .then(response => {
                console.log("CREATE MESSAGE RESPONSE: ", response)
                getMessages({auth})
                .then(response => {
                    console.log("GET MESSAGES AFTER NEW MESSAGE RESPONSE: ", response)
                    setNewMessages(response.data)
                    setContent("")
                    setFileKey(uuidv4())
                    setImage("")
                })
            })
        }
    }

    
    return (
        <div style={{backgroundColor: "rgba(75, 0, 205, 0.5)", border: "solid", height: "min-content", marginLeft: "15px", boxShadow: "5px 5px 10px black"}}>
            <div style={{display: "flex", justifyContent: "end"}}>
                <div>
                    <div style= {{ justifyContent: "end", margin: "10px", display: "flex", alignItems: "center"}} >
                        <textarea value={content} style={{ width: "500px" }} onChange={e => setContent(e.target.value)}></textarea>
                    </div>
                    <div style={{display: "flex", justifyContent:"end"}}>
                        <input key={fileKey} style={{ margin: '10px', width: '205px' }} type="file" accept='image/*' onChange={e => setImage(e.target.files[0])} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "end", margin: '10px' }}>
                        <button onClick={() => sendMessage()}>Send Message</button>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default ChatUpload