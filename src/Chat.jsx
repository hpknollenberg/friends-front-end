import Tabs from "./Tabs"
import ChatUpload from "./ChatUpload.jsx"
import { useContext, useEffect, useState, useRef } from "react"
import { config } from "react-spring"
import useScrollTo from 'react-spring-scroll-to-hook'
import { AuthContext, UserContext } from "./context"
import { baseUrl, getMessages, deleteMessage } from "./api"



const Chat = () => {
    const { auth } = useContext(AuthContext)
    const { user, setUser } = useContext(UserContext)
    const [ deleteCheck, setDeleteCheck ] = useState(false)
    const [ deleteId, setDeleteId ] = useState(0)
    const [ newMessages, setNewMessages ] = useState([])
    const socket = useRef(null)


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
                    style={{maxHeight: '200px', maxWidth: "100%"}} />
            )
        }
    }


    const MessageProfilePicture = ({author, picture, firstName}) => {
        if (author !== user) {
            return(
                <div style={{ display: "flex", flexDirection: "column", margin: "10px", borderRight: "solid", borderColor: "grey", borderWidth: "1px", paddingRight: "15px", height: "fit-content" }}>
                    <div style={{display: 'block', height: '67.5px', width: '67.5px', borderRadius: "50%", borderStyle: 'solid', borderColor: 'black', boxShadow: "5px 5px 10px black"}}>
                        <img style={{ borderRadius: "50%", width: "100%", height: "100%", borderColor: "black", objectFit: "cover"}}
                        src={`${baseUrl}${picture}`} />                  
                    </div>
                    <p style={{ display: "flex", justifyContent: "center", fontWeight: "bold", marginBottom: "0", textShadow: "5px 5px 10px black" }}>{firstName}</p>
                </div>
            )
        }
    }


    const Messages = () => {
        const [ messages, setMessages ] = useState([])
        const [ overflowNecessary, setOverFlowNecessary ] = useState(false)
        const chatBoxRef = useRef(null)
        const [ renderCount, setRenderCount ] = useState(0)
        const WS_URL = "ws://127.0.0.1:8000/ws/chat/"
        const [ chatScrollTop, setChatScrollTop ] = useState(chatBoxRef?.current?.scrollHeight)
        const [ updateMessages, setUpdateMessages ] = useState(false)
        const [ haltUpdate, setHaltUpdate ] = useState(false)


        useEffect(() => {
            if (chatBoxRef.current && chatScrollTop <= (chatBoxRef.current.scrollHeight - chatBoxRef.current.offsetHeight)) {
                setHaltUpdate(true)
            } else {
                setHaltUpdate(false)
            }
        }, [chatScrollTop])


        useEffect(() => {
            console.log("ping")
            if (haltUpdate == false) {
                getMessages({auth})
                .then(response => {  
                    setMessages(response.data)
                })
            }
        }, [updateMessages, haltUpdate])


        useEffect(() => {
            setMessages(newMessages)
        }, [newMessages])

        
        useEffect(() => {
            if (chatBoxRef.current) {
                if (chatBoxRef.current.scrollHeight < chatBoxRef.current.offsetHeight) {
                    setOverFlowNecessary(true) 
                }
            }  
        }, [messages])


        useEffect(() => {
            if (socket.current) {
                socket.current.onmessage = (event) => {
                    console.log('NEW MESSAGE: ', event.data)
                    const eventData = JSON.parse(event.data)
                    if (eventData.message === "successful") {
                        setUpdateMessages(!updateMessages)
                    }
                }
            }

            return () => {
                if (socket.current) {
                    socket.current.onmessage = null
                }
            }
        }, [socket])


        useEffect(() => {
            if (!socket.current) {
                socket.current = new WebSocket(WS_URL)
            
                socket.current.onopen = () => {
                    console.log("connection opened")
                }

                socket.current.onerror = (event) => {
                    console.error("error:", event)
                }

                socket.current.onclose = (event) => {
                    console.log("closed:", event)
                }
            }
        }, [])

        /*useEffect(() => {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
        })*/


        return (
            <div ref={chatBoxRef} style={{ display: "flex", flexDirection: "column-reverse", overflowY: overflowNecessary && "scroll", height: "62.5vh",
            border: "solid", boxShadow: "5px 5px 10px black" }} className="col-lg-6 col-12" onScroll={() => setChatScrollTop(chatBoxRef?.current?.scrollTop)}>
                {messages && messages.map((message) => {
                    return (
                        <div key={message.id} 
                            style={{ borderBottom: "solid", borderColor: "grey", borderWidth: "1px", display: "flex", justifyContent: message.author.id == user ? "end" : "start"}}>
                            <div style={{ display: "flex", alignItems: "center", margin: "2.5%", marginLeft: "0px" }}>  
                                <MessageProfilePicture author={message.author.id} picture={message.author.profile_picture} firstName={message.author.first_name} />
                                <div style={{display: "flex", flexDirection: "column", alignItems: message.author.id === user ? "end" : "start", marginLeft: "50px", color: message.author.id === user && "black"}}>
                                    <MessageImage image={message.image}/>
                                    <p style={{margin: "0px"}}>{message.content}</p>
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
            <div className="d-flex flex-wrap flex-lg-nowrap row" style={{margin: "10px"}}>
                <Messages />
                <ChatUpload newMessages={newMessages} setNewMessages={setNewMessages} socket={socket}/>
            </div>
        </div>
    )
}

export default Chat