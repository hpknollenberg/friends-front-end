import { baseUrl, editProfileBio, editProfileName } from "./api"
import { AuthContext, ToggleContext } from "./context"
import { useContext, useState, useEffect } from "react"


const ProfileInfo = ({profilePicture, setProfilePicture, lastName, setLastName, firstName, setFirstName, bio, setBio}) => {
    const { auth } = useContext(AuthContext)
    

    const ProfileBioDisplay = () => {
        const [ tempBio, setTempBio ] = useState(bio)
        const [ currentBio, setCurrentBio ] = useState(bio)
        const [ tempBioTextColor, setTempBioTextColor ] = useState("black")
     
     
        const bioChange = ({bioText}) => {
            if (bioText != currentBio) {
                setTempBioTextColor("red")
            } else if (tempBioTextColor != "black") {
                setTempBioTextColor("black")
            }
            setTempBio(bioText)
        }
     
     
        const bioUpdate = () => {
            editProfileBio({auth: auth, bio: tempBio})
            .then(response => {
                if (response.status = 200) {
                    setTempBio(response.data.profile_bio)
                    setTempBioTextColor("black")
                    setCurrentBio(response.data.profile_bio)
                }
            })
        }


        return(
            <div style={{display:"flex", alignItems: "start", margin: "2.5%" }}>
                <textarea style={{ height: '100px', width: '375px', color: tempBioTextColor }} 
                    value={tempBio} 
                    onChange={e => bioChange({bioText: e.target.value})} ></textarea>
                <button style={{ width: '100px', marginLeft: "2.5%"}}
                    onClick={bioUpdate}>
                    Save Bio</button>
            </div>
        )

    }

    const ProfileNameDisplay = () => {
        const [ tempFirstName, setTempFirstName ] = useState(firstName)
        const [ tempLastName, setTempLastName ] = useState(lastName)
        const [ currentFirstName, setCurrentFirstName ] = useState(firstName)
        const [ currentLastName, setCurrentLastName ] = useState(lastName)
        const [ editName, setEditName ] = useState(false)


        useEffect(() => {
            setTempFirstName(currentFirstName)
            setTempLastName(currentLastName)
        }, [editName])
        

        const nameUpdate = () => {
            editProfileName({auth: auth, firstName: tempFirstName, lastName: tempLastName})
            .then((response) => {
                if (response.status = 200) {
                    setTempFirstName(response.data.first_name)
                    setTempLastName(response.data.last_name)
                    setEditName(false)
                    setCurrentFirstName(response.data.first_name)
                    setCurrentLastName(response.data.last_name)
                }
            })
        }


        if (editName) {
            return(
                <div style={{display: "flex", alignItems: "center"}}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <p style={{width: "100px", margin: "2.5%", fontWeight: "bold"}}>First Name:</p>
                            <input type="text"
                                value={tempFirstName}
                                style={{width: "200px", height: "30px"}}
                                onChange={e => setTempFirstName(e.target.value)}/>
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <p style={{width: "100px", margin: "2.5%", fontWeight: "bold"}}>Last Name:</p>
                            <input type="text"
                                value={tempLastName}
                                style={{width: "200px", height: "30px"}}
                                onChange={e => setTempLastName(e.target.value)}/>
                        </div> 
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <button style={{ marginLeft: "30px", marginBottom: "2.5%", width: "150px", height: "30px "}}
                            onClick={() => nameUpdate()}>
                            Save Changes</button>
                        <button style={{ marginLeft: "30px", marginTop: "2.5%", width: "150px", height: "30px" }} 
                            onClick={() => setEditName(false)}
                            >Discard Changes</button> 
                    </div>
                </div>
            )
        } else {
            return(
                <div style={{display: "flex", alignItems: "center"}}>
                    <h2 style={{ margin: "2.5%" }}>{currentFirstName} {currentLastName}</h2>
                    <button style={{ width: '100px', marginLeft: "2.5%"}}
                        onClick={() => setEditName(true)}>Edit Name</button>
                </div>
            )
        }
    }

    const ProfilePictureDisplay = () => {
        if (profilePicture) {
            return(
                <div style={{display: 'block', width: '200px', height: '200px', margin: '10px', marginBottom: '25px', borderRadius: "50%", borderStyle: 'solid', borderColor: 'black'}}>
                    <img src={`${baseUrl}${profilePicture}`} 
                        style={{ borderRadius: "50%", margin: '2.5%', width: "95%", height: '95%', color: 'white', objectFit: "cover"}} />
                </div>
            )           
        }
    }
    

    return(
        <div>
            <div style={{display: "flex"}}>
                <ProfilePictureDisplay image={profilePicture} />
                <div>
                    <ProfileNameDisplay />
                    <ProfileBioDisplay />
                </div>
            </div>

        </div>
    )
}

export default ProfileInfo