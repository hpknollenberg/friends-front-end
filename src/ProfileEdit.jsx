import { editProfile } from "./api"
import { AuthContext, ToggleContext } from "./context"
import { useContext, useState } from "react"
import { v4 as uuidv4 } from "uuid"


const ProfileEdit = ({profilePicture, setProfilePicture}) => {
    const { auth } = useContext(AuthContext)
    const { universalToggle, setUniversalToggle } = useContext(ToggleContext)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [uploadImage, setUploadImage] = useState("")
    const [fileInputKey, setFileInputKey] = useState(uuidv4())



    const submitProfileEdits = () => {
        editProfile({auth, firstName, lastName, uploadImage})
        .then(response => {
            setProfilePicture(response.data.profile_picture)
            setFileInputKey(uuidv4())
        })
    }

    

    return (
        <div>
            <input style={{ margin: '10px', width: '275px' }} 
                key={fileInputKey} 
                type="file" 
                accept='image/*' 
                onChange={e => setUploadImage(e.target.files[0])}/>
            <button style={{ margin: '10px' }} 
                onClick={() => {submitProfileEdits()}}>
                Change Profile Picture</button>
        </div>
    )
}

export default ProfileEdit