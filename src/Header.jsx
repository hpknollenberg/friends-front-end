import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "./context"
import { useContext } from "react"



function Header() {
  const { auth } = useContext(AuthContext)
  const navigate = useNavigate()
  
  
  function submit() {
    auth.setAccessToken([])
    navigate('/')
  }


  return (
    <div style={{ borderBottom: "solid", borderColor: "white", borderWidth: "2.5px", boxShadow: "5px 5px 10px black" }} className="header">
      <div style={{ padding: '10px', backgroundColor: 'rgba(120, 120, 125, 1)',
      borderBottom: "solid", borderColor: "white", borderWidth: "2.5px", boxShadow: "5px 5px 10px black"}} className="d-flex justify-content-end">
        <Link style={{ marginRight: '10px', color: "white" }} to='/login' onClick={() => {submit()}}>Logout</Link>
      </div>

      <h1 className="p-3 m-0">The World River</h1>
      
    </div>
  )
}

export default Header