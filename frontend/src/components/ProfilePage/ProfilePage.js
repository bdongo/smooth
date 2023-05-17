import { useDispatch, useSelector } from "react-redux";
import "./ProfilePage.css";
import { getAgendas } from "../../store/agendas";
import { useEffect } from "react";
import { fetchAgendas } from "../../store/agendas";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const agendas = useSelector(getAgendas)

    useEffect(() => {
        dispatch(fetchAgendas(currentUser?._id))
    }, [currentUser])
    

    return (
        <div className="profile-container">
            <h1>{currentUser?.username}</h1>
            <div className="itinerary-conatiner">
                {agendas?.map(agenda => 
                    <div>

                    </div>
                )}
            </div>
        </div>
    )
}
export default ProfilePage;