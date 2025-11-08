import Tabs from "./Tabs"
import { useContext, useEffect, useState } from "react"
import { AuthContext, ToggleContext } from "./context"
import { baseUrl, getProfile, editProfilePicture } from "./api"
import ProfileInfo from "./ProfileInfo"
import { v4 as uuidv4 } from "uuid"



const Profile = () => {
    const { auth } = useContext(AuthContext)
    const [profile, setProfile] = useState([])
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const [bio, setBio] = useState("")
    const [uploadImage, setUploadImage] = useState("")
    const [fileInputKey, setFileInputKey] = useState(uuidv4())
    
    
    useEffect(() => {
        getProfile({auth})
        .then(response => {
            setProfile(response.data)
            setProfilePicture(response.data.profile_picture)
            setFirstName(response.data.first_name)
            setLastName(response.data.last_name)
            setBio(response.data.profile_bio)
        })
    }, [auth.accessToken])



    //Update Profile Picture
    useEffect(() => {
        if (uploadImage != "") {
            editProfilePicture({auth: auth, uploadImage: uploadImage})
            .then(response => {
                setProfilePicture(response.data.profile_picture)
                setFileInputKey(uuidv4())
            }) 
        }
    }, [uploadImage])

    

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
            <input style={{ marginLeft: "10px", marginBottom: "5px", width: '275px' }} 
                key={fileInputKey} 
                type="file" 
                accept='image/*' 
                onChange={e => setUploadImage(e.target.files[0])}/>
        </div>
            
    )
}

export default Profile