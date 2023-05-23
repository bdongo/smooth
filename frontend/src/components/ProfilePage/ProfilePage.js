import { useDispatch, useSelector } from "react-redux";
import "./ProfilePage.css";
import {getSavedAgendas } from "../../store/agendas";
import { useEffect } from "react";
import { fetchAgendas } from "../../store/agendas";
import SavedItinerary from "../SavedItinerary/SavedItinerary";
import LoginForm from "../SessionForms/LoginForm";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ProfilePage = ({openItinerary}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session?.user)
    const agendas = useSelector(getSavedAgendas);

    useEffect(() => {
        dispatch(fetchAgendas(currentUser?._id))
    }, [dispatch, currentUser])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    useEffect(() => {
        if (currentUser) {
            document.title = `Smooth - Profile`;
        }
    }, [currentUser]);

    useEffect(() => () => document.title = `Smooth`, []);

    if (!currentUser) {
        return (
            <LoginForm/>
        )
    }

    const handleGo = (e) => {
        e.preventDefault();
        history.push('/explore');
        openItinerary();
    }

    const totalEvents = (itinerary) => ( itinerary?.events.length);
    const totalHours = (itinerary) =>  (itinerary?.events.reduce((acc, event) => (
        acc + event.avgTime
    ), 0));
    const totalPrice = (itinerary) => (itinerary?.events.reduce((acc, event) => (
        acc + event.avgPrice
    ), 0));
    

    return (
        <div className="profile-container">
            
            <div className="itineraries-container">
                {currentUser && agendas != 0 && 
                    <h1>{currentUser?.username}'s saved itineraries:</h1>
                }
                {agendas.length === 0  && currentUser && 
                <>
                    <h1>Hi {currentUser?.username}! You have no itineraries saved, build and save yours now!</h1>
                    <button className='go-button' onClick={handleGo}>Go</button>
                </>
                }
                {agendas?.map((agenda, idx) => 
                    <div className="itinerary-display"> 
                        <h2>{idx+1}.</h2>
                        <SavedItinerary key={idx} itinerary={agenda}/>
                        <div className='itinerary-calc'>
                            <div>
                                <p>Total Events: {totalEvents(agenda)}</p>
                            </div>
                            <div>
                                <p>Total Price: ${totalPrice(agenda).toFixed(2)} </p>
                            </div>
                            <div>
                                <p>Total Hours: {totalHours(agenda).toFixed(2)} </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default ProfilePage;