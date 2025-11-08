import { baseUrl, editProfile } from "./api"
import { AuthContext, ToggleContext } from "./context"
import { useContext, useState } from "react"
import { v4 as uuidv4 } from "uuid"


const ProfileInfo = ({profilePicture, setProfilePicture, lastName, setLastName, firstName, setFirstName, bio, setBio}) => {
    const { auth } = useContext(AuthContext)


    const ProfilePictureDisplay = () => {
        if (profilePicture) {
            return(
                <div style={{display: 'block', width: '200px', height: '200px', margin: '10px', marginBottom: '25px', borderRadius: "50%", borderStyle: 'solid', borderColor: 'black'}}>
                    <img src={`${baseUrl}${profilePicture}`} 
                        style={{ borderRadius: "50%", borderStyle: "", margin: '2.5%', width: "95%", height: '95%', color: 'white', objectFit: "cover"}} />
                </div>
            )           
        }
    }
    

    return(
        <div>
            <div style={{display: "flex"}}>
                <ProfilePictureDisplay image={profilePicture} />
                <div>
                    <h2 className="p-3">{firstName} {lastName}</h2>
                    <p className="p-3" style={{display:"flex", alignItems: "start"}}>Bio: 
                        <span> </span>
                        <textarea style={{ height: '100px', width: '375px', margin: "10px" }} value={bio} onChange={e => setBio(e.target.value)} ></textarea>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default ProfileInfo