import Tabs from "./Tabs"
import { useContext, useEffect, useState } from "react"
import { AuthContext, ToggleContext } from "./context"
import { baseUrl, getProfile } from "./api"
import ProfileEdit from "./ProfileEdit"
import ProfileInfo from "./ProfileInfo"



const Profile = () => {
    const { auth } = useContext(AuthContext)
    const [profile, setProfile] = useState([])
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const [bio, setBio] = useState("")
    
    
    useEffect(() => {
        getProfile({auth})
        .then(response => {
            setProfile(response.data)
            setProfilePicture(response.data.profile_picture)
            setFirstName(response.data.first_name)
            setLastName(response.data.last_name)
            setBio(response.data.bio)
        })
    }, [auth.accessToken])

    

    return (
        <div>
            <Tabs activeTab="profile"/>
            <div style={{display: "flex"}}>
                <ProfileInfo 
                    profilePicture={profilePicture} 
                    setProfilePicture={setProfilePicture}
                    lastName={lastName}
                    setLastName={setLastName}
                    firstName={firstName}
                    setFirstName={setFirstName}
                    bio={bio}
                    setBio={setBio} />
            </div>
            <ProfileEdit 
                profilePicture={profilePicture} 
                setProfilePicture={setProfilePicture}/>
        </div>
    )
}

export default Profile