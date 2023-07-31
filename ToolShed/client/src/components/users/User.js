import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const user = () => {
    const [user, setUser] = useState([])

    const navigate = useNavigate()

    return <>
        <h3>My Account </h3>
        <div className="info__card">
            <div>Name : {user?.name}</div>
            <div>Email : {user?.email}</div>
        </div>
        <div className="updateButtonDiv">
            <button className="update__button" onClick={() => navigate(`/myAccount/${user?.id}/edit`)}>Update Account info</button>
        </div>
    </>
}