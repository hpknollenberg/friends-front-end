import Tabs from "./Tabs"
import ChatUpload from "./ChatUpload.jsx"
import { useContext, useEffect, useState, useRef } from "react"
import { AuthContext, UserContext } from "./context"
import { baseUrl, getMessages, deleteMessage } from "./api"



const Chat = () => {
    const { auth } = useContext(AuthContext)
    const { user, setUser } = useContext(UserContext)
    const [ deleteCheck, setDeleteCheck ] = useState(false)
    const [ deleteId, setDeleteId ] = useState(0)
    const [ newMessages, setNewMessages ] = useState([])


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


    const MessageProfilePicture = ({author, picture, firstName}) => {
        if (author !== user) {
            return(
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    <div style={{display: 'block', width: '75px', height: '75px', margin: '10px', borderRadius: "50%", borderStyle: 'solid', borderColor: 'black'}}>
                        <img style={{ borderRadius: "50%", margin: '2.5%', width: "95%", height: '95%', borderColor: "black", objectFit: "cover"}}
                        src={`${baseUrl}${picture}`} />                  
                    </div>
                    <p style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>{firstName}</p>
                </div>
            )
        }
    }


    const Messages = () => {
        const [ messages, setMessages ] = useState([])
        const [ overflowNecessary, setOverFlowNecessary ] = useState(false)
        const chatBoxRef = useRef(null)


        useEffect(() => {
            getMessages({auth})
            .then(response => {
                setMessages(response.data)
            })
        }, [])

        useEffect(() => {
            setMessages(newMessages)
        }, [newMessages])

        
        useEffect(() => {
            if (chatBoxRef.current && chatBoxRef.current.scrollHeight > chatBoxRef.current.offsetHeight) {
                console.log("scrollHeight: ", chatBoxRef.current.scrollHeight)
                console.log("offsetHeight: ", chatBoxRef.current.offsetHeight)
                setOverFlowNecessary(true)   
            }
        }, [messages])

        useEffect(() => {
            if (chatBoxRef.current) {
                console.log("Scroll top will now be: ", chatBoxRef.current.scrollHeight)
                chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
            }
        })


        return (
            <div ref={chatBoxRef} style={{ overflowY: overflowNecessary && "scroll",
                                            width: "800px", height: "475px", border: "solid", boxShadow: "10px 10px 10px black" }} >
                {messages && messages.map((message) => {
                    return (
                        <div key={message.id} 
                            style={{ margin: "25px", display: "flex", justifyContent: message.author.id == user ? "end" : "start"}}>
                            <div style={{ display: "flex", alignItems: "center" }}>  
                                <MessageProfilePicture author={message.author.id} picture={message.profile_picture} firstName={message.author.first_name} />
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
        <div>
            <Tabs activeTab="chat"/>
            <div style={{display: "flex", margin: "10px"}}>
                <Messages />
                <ChatUpload newMessages={newMessages} setNewMessages={setNewMessages}/>
            </div>
        </div>
    )
}

export default Chat