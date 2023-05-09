import jwtFetch from "./jwt";
import { ADD_REVIEW } from "./reviews";

export const RECEIVE_EVENTS = "events/RECEIVE_EVENTS";
export const RECEIVE_EVENT = "events/RECEIVE_EVENT";

const receiveEvents = events => ({
    type: RECEIVE_EVENTS,
    events
});

const receiveEvent = event => ({
    type: RECEIVE_EVENT,
    event
});

export const getEvents = state => {
    return state?.events ? Object.values(state.events) : [];
};

export const getEvent = eventId => state => {
    return state?.events ? state.events[eventId] : null;
};

export const fetchEvents = () => async (dispatch) => {
    const res = await jwtFetch(`/api/events/`)

    if(res.ok){
        const events = await res.json()
        dispatch(receiveEvents(events))
    }
};

export const fetchEvent = eventId => async(dispatch) => {
    const res = await jwtFetch (`/api/events/${eventId}`);

    if(res.ok) {
        const event = await res.json();
        dispatch(receiveEvent(event))
    }
};

const eventsReducer = (state = {}, action) => {
    switch(action.type){
        case RECEIVE_EVENTS:
            return {...action.events};
        case RECEIVE_EVENT:
            return {...state, [action.event._id]: action.event}
        case ADD_REVIEW:
            return {...state, [action.payload.event.id]: action.payload.event}
        default:
            return state;
    }
}

export default eventsReducer;


