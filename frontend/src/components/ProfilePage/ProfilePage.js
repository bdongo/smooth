import { useDispatch, useSelector } from "react-redux";
import "./ProfilePage.css";
import {getSavedAgendas } from "../../store/agendas";
import { useEffect } from "react";
import { fetchAgendas, deleteAgenda } from "../../store/agendas";
import SavedItinerary from "../SavedItinerary/SavedItinerary";
import LoginForm from "../SessionForms/LoginForm";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { IoCloseSharp } from 'react-icons/io5';
import { useState } from "react";

const ProfilePage = ({openItinerary}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session?.user)
    const agendas = useSelector(getSavedAgendas);
    const [deleteHelper, setDeleteHelper] = useState(false)

    // useEffect(() => {
    //     dispatch(fetchAgendas(currentUser?._id))
    //     console.log('fetch')
    // }, [dispatch, currentUser, deleteHelper])

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchAgendas(currentUser?._id))
        }
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

    const handleDelete = (agendaId) => {
        dispatch(deleteAgenda(agendaId))
        setDeleteHelper(!deleteHelper)
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
                {currentUser && agendas !== 0 && 
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
                            <IoCloseSharp className='delete-itin' onClick={()=> handleDelete(agenda._id)}/>
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