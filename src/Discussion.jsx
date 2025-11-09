import Tabs from "./Tabs"
import DiscussionUpload from "./DiscussionUpload"
import { useContext, useEffect, useRef, useState } from "react"
import { AdminContext, AuthContext, ToggleContext, UserContext } from "./context"
import { baseUrl, getMessages, createComment, getComments, updateCommentLikes, deleteMessage, deleteComment, getThreadComments, updateThreadCommentLikes, createThreadComment, deleteThreadComment } from "./api"



const Discussion = () => {
    const { auth } = useContext(AuthContext)
    const { admin, setAdmin } = useContext(AdminContext)
    const [messages, setMessages] = useState([])
    const { user, setUser } = useContext(UserContext)
    const [comments, setComments] = useState([])
    const [toggle, setToggle] = useState(false)
    const [deleteCheck, setDeleteCheck] = useState(false)
    const [discussionToggle, setDiscussionToggle] = useState(false)
    const [deleteId, setDeleteId] = useState(0)
    const [threadComments, setThreadComments] = useState([])
    const {universalToggle, setUniversalToggle} = useContext(ToggleContext)
    const [threadToggle, setThreadToggle] = useState(false)
    
    const [openIds, setOpenIds] = useState([])
    const [openThreadIds, setOpenThreadIds] = useState([])


    useEffect(() => {
        getMessages({auth})
        .then(response => {
            setMessages(response.data)
        })
    }, [])


    const submitDeleteMessage = ({message}) => {
        if (deleteCheck === true && deleteId === message) {
            deleteMessage({auth, user, message})
        }
        setDeleteCheck(deleteCheck => !deleteCheck)   
    }

    
    const DeleteCheck = ({id}) => {
        if (deleteCheck === true && deleteId === id) {
            return (
                <p>Are you sure you want to delete?</p>
            )
        }
    }


    const DeleteMessageButton = ({message, author}) => {
        if (user === author) {
            return (
                <div style={{ margin: '10px' }}>   
                    <button 
                        style={{backgroundColor: 'red' }} 
                        onClick={() => {submitDeleteMessage({message}); setDeleteId(message)}}
                        >Delete</button>
                    <DeleteCheck id={message}/>
                </div>
            )
        }
    }


    const MessageImage = ({image}) => {
        if (image) {
            return(
                <img src={`${baseUrl}${image}`} 
                    style={{maxHeight: '200px'}} />
            )
        }
    }


    const Messages = () => {
        return (
            <div>
                {messages && messages.map((message) => {
                    return (
                        <div key={message.id} 
                            style={{ margin: "25px", display: "flex", justifyContent: message.author.id == user ? "end" : "start"}}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                                    <div style={{display: 'block', width: '75px', height: '75px', margin: '10px', borderRadius: "50%", borderStyle: 'solid', borderColor: 'black'}}>
                                        <img style={{ borderRadius: "50%", margin: '2.5%', width: "95%", height: '95%', borderColor: "black", objectFit: "cover"}}
                                            src={`${baseUrl}${message.author.profile_picture}`} />
                                    </div>
                                    <p style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>{message.author.first_name}</p>
                                </div>
                                <div style={{display: "flex", flexDirection: "column", alignItems: "end", marginLeft: "50px"}}>
                                    <MessageImage image={message.image}/>
                                    <p>{message.content}</p>
                                </div>
                            </div>
                            <DeleteMessageButton message={message.id} author={message.author}/>
                        </div>
                    )
                })}
            </div>
        )
    }


    return (
        <div className=''>

            <Tabs activeTab="discussion"/>

            <div style={{overflow: "scroll"}}> 
                <div style={{ maxWidth: ''}}>
                    <Messages />
                </div>
            </div>
            <div style={{position: "fixed", bottom: "0", right: "0", zIndex: "1000", backgroundColor: "rgba(75, 0, 205, 1)", border: "solid"}}>
                <DiscussionUpload />
            </div>
        </div>
    )
}

export default Discussion