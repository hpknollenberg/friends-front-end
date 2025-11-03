
const Tabs = ({activeTab}) => {
    
    return (
        <div style={{ marginTop: "5px", borderBottom: "solid", borderColor: "white" }}>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className={`nav-link ${(activeTab === "feed" ? "active" : "")}`} aria-current="page" href="/" style={{color: `${(activeTab === "feed") ? "black" : "white"}`}}>Feed</a>
                </li>
            
                <li className="nav-item">
                    <a className={`nav-link ${(activeTab === "discussion" ? "active" : "")}`} href="/discussion" style={{color: `${(activeTab === "discussion") ? "black" : "white"}` }}>Discussion</a>
                </li>

                <li className="nav-item">
                    <a className={`nav-link ${(activeTab === "profile" ? "active" : "")}`} href="/profile" style={{color: `${(activeTab === "profile") ? "black" : "white"}` }}>Profile</a>
                </li>
                
            </ul>
        </div>
    )
}

export default Tabs