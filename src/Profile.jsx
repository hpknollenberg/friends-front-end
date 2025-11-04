import Tabs from "./Tabs"
import { useContext, useEffect, useState } from "react"
import { AuthContext, ToggleContext } from "./context"
import { baseUrl, getProfile } from "./api"
import ProfileEdit from "./ProfileEdit"



const Profile = () => {
    const { auth } = useContext(AuthContext)
    const { universalToggle, setUniversalToggle } = useContext(ToggleContext)
    const [profile, setProfile] = useState([])
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    
    
    useEffect(() => {
        getProfile({auth})
        .then(response => {
            setProfile(response.data)
        })
    }, [auth.accessToken, universalToggle])

    
    

    /*const PhotoUpload = () => {
        return (
            <div>
                <input style={{ margin: '10px', width: '275px' }} type="file" accept='image/*' onChange={e => setProfilePicture(e.target.files[0])} />
                <button style={{ margin: '10px' }} onClick={() => {submitProfileEdits()}}>Change Profile Picture</button>
            </div>
        )
    }*/

    const ProfilePictureDisplay = ({image}) => {
        if (image) {
            return(
                <div>
                    <img src={`${baseUrl}${image}`} />
                </div>
            )           
        }
    }

    /*const submitProfileEdits = () => {
        editProfile({auth, firstName, lastName, profilePicture})
        .then(response => {
            console.log("PROFILE INFO: ", response.data)
            setProfile(response.data)
        })
    }*/

    return (
        <div className=''>

            <Tabs activeTab="profile"/>
            <h2 className="p-3">{profile.first_name} {profile.last_name}</h2>
            <ProfilePictureDisplay image={profile.profile_picture} />
            {/*<PhotoUpload />*/}
            <ProfileEdit />
        </div>
    )
}

export default Profile