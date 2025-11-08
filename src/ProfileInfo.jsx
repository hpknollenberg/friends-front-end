import { baseUrl, editProfileBio } from "./api"
import { AuthContext, ToggleContext } from "./context"
import { useContext, useState, useEffect } from "react"


const ProfileInfo = ({profilePicture, setProfilePicture, lastName, setLastName, firstName, setFirstName, bio, setBio}) => {
    const { auth } = useContext(AuthContext)
    const [ textColor, setTextColor ] = useState("black")
    const [ tempBio, setTempBio ] = useState(bio)

    
    

    const bioChange = (bioText) => {
        setTempBio(bioText)
        setTextColor("red")
    }


    const bioUpdate = () => {
        editProfileBio({auth: auth, bio: bio})
        .then(response => {
            if (response.status = 200) {
                setTextColor("black")
            }
        })
    }


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
                    <h2 style={{ padding: "2.5%" }}>{firstName} {lastName}</h2>
                    <p style={{display:"flex", alignItems: "start", padding: "2.5%" }}>Bio: 
                        <textarea style={{ height: '100px', width: '375px', marginLeft: "2.5%", color: textColor }} 
                            value={tempBio} 
                            onChange={e => bioChange(e.target.value)} ></textarea>
                        <button style={{ width: '100px', marginLeft: "2.5%"}}
                            onClick={bioUpdate()}>
                            Save Bio</button>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default ProfileInfo