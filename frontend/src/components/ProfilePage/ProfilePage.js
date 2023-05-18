import { useDispatch, useSelector } from "react-redux";
import "./ProfilePage.css";
import { getAgendas } from "../../store/agendas";
import { useEffect } from "react";
import { fetchAgendas } from "../../store/agendas";
import SavedItinerary from "../SavedItinerary/SavedItinerary";
import LoginForm from "../SessionForms/LoginForm";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session?.user)
    const agendas = useSelector(getAgendas)

    useEffect(() => {
        dispatch(fetchAgendas(currentUser?._id))
    }, [dispatch, currentUser])

    if (!currentUser) {
        return (
            <LoginForm/>
        )
    }
    

    return (
        <div className="profile-container">
            
            <div className="itineraries-container">
                {currentUser && 
                    <h1>{currentUser?.username}'s saved itineraries:</h1>
                }
                {agendas?.map((agenda, idx) => 
                    <div className="saved-itinerary"> 
                        <h2>{idx+1}.</h2>
                        <SavedItinerary key={idx} itinerary={agenda}/>
                    </div>
                )}
            </div>
        </div>
    )
}
export default ProfilePage;