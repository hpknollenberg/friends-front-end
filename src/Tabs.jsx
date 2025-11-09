
const Tabs = ({activeTab}) => {
    
    return (
        <div style={{ marginTop: "5px", borderBottom: "solid", borderColor: "white", boxShadow: "5px 5px 10px black" }}>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className={`nav-link ${(activeTab === "feed" ? "active" : "")}`} aria-current="page" href="/" style={{color: `${(activeTab === "feed") ? "black" : "white"}`}}>Feed</a>
                </li>
            
                <li className="nav-item">
                    <a className={`nav-link ${(activeTab === "chat" ? "active" : "")}`} href="/chat" style={{color: `${(activeTab === "chat") ? "black" : "white"}` }}>Chat</a>
                </li>

                <li className="nav-item">
                    <a className={`nav-link ${(activeTab === "profile" ? "active" : "")}`} href="/profile" style={{color: `${(activeTab === "profile") ? "black" : "white"}` }}>Profile</a>
                </li>
                
            </ul>
        </div>
    )
}

export default Tabs