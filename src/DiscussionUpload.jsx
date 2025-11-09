import { useContext, useState } from "react"
import { AdminContext, AuthContext, ToggleContext, UserContext } from "./context"
import { createMessage } from "./api"


const DiscussionUpload = () => {
    const { auth } = useContext(AuthContext)
    const { admin, setAdmin } = useContext(AdminContext)
    const { user, setUser } = useContext(UserContext)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")
    const {universalToggle, setUniversalToggle} = useContext(ToggleContext)


    const sendMessage = () => {
        createMessage({auth, user, content, image})
    }

    
    return (
        <div style={{display: "flex", justifyContent: "end"}}>
            <div>
                <div style= {{ justifyContent: "end", margin: "10px", display: "flex", alignItems: "center"}} >
                    <textarea style={{ width: "500px" }} onChange={e => setContent(e.target.value)}></textarea>
                </div>
                <div style={{display: "flex", justifyContent:"end"}}>
                    <input style={{ margin: '10px', width: '205px' }} type="file" accept='image/*' onChange={e => setImage(e.target.files[0])} />
                </div>
                <div style={{ display: "flex", justifyContent: "end", margin: '10px' }}>
                    <button onClick={() => sendMessage()}>Send Message</button>
                </div>
            </div>
        </div>
    ) 
}

export default DiscussionUpload