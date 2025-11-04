import { editProfile } from "./api"
import { AuthContext, ToggleContext } from "./context"
import { useContext, useState } from "react"


const ProfileEdit = () => {
    const { auth } = useContext(AuthContext)
    const { universalToggle, setUniversalToggle } = useContext(ToggleContext)
    const [profilePicture, setProfilePicture] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")



    const submitProfileEdits = () => {
        editProfile({auth, firstName, lastName, profilePicture})
        .then(response => {
            setUniversalToggle(!universalToggle)
        })
    }

    
    return (
        <div>
            <input style={{ margin: '10px', width: '275px' }} type="file" accept='image/*' onChange={e => setProfilePicture(e.target.files[0])} />
            <button style={{ margin: '10px' }} onClick={() => {submitProfileEdits()}}>Change Profile Picture</button>
        </div>
    )
}

export default ProfileEdit