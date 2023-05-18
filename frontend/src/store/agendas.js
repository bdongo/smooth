import jwtFetch from "./jwt";

export const RECEIVE_AGENDAS = 'agendas/RECEIVE_AGENDAS';
export const RECEIVE_AGENDA = 'agendas/RECEIVE_AGENDA';
export const REMOVE_AGENDA = 'agendas/REMOVE_AGENDA';
export const UPDATE_AGENDA = 'agendas/UPDATE_AGENDA';

const receiveAgendas = agendas => ({
    type: RECEIVE_AGENDAS,
    agendas
});

const updateAgenda = newAgenda => ({
    type: UPDATE_AGENDA,
    payload: newAgenda
})

const receiveAgenda = agenda => ({
    type: RECEIVE_AGENDA,
    agenda
});

const removeAgenda = agendaId => ({
    type: REMOVE_AGENDA,
    agendaId
});

export const getAgendas = state => {
    return state?.agendas ? Object.values(state.agendas) : [];
};

export const getLiveAgenda = state => {
    return state?.agendas ? Object.values(state.agendas)[0] : null;
}

export const getAgenda = agendaId => state => {
    return state?.agendas ? state.agendas[agendaId] : null;
};

export const fetchAgendas = ( userId ) => async(dispatch) => {
    const params = new URLSearchParams();
    if(userId) params.append('user', userId)

    const res = await jwtFetch(`/api/agendas/?${params.toString()}`);

    if(res.ok){
        const agendas = await res.json();
        dispatch(receiveAgendas(agendas));
    };
};

export const fetchAgenda = agendaId => async(dispatch) => {
    const res = await jwtFetch (`/api/agendas/${agendaId}`);

    if(res.ok) {
        const agenda = await res.json();
        dispatch(receiveAgenda(agenda))
    }
};

export const fetchLiveAgenda = userId => async(dispatch) => {
    const params = new URLSearchParams();
    if(userId) params.append('user', userId)

    const res = await jwtFetch (`/api/agendas/unsaved?${params.toString()}`);

    if(res.ok){
        const agenda = await res.json();
        dispatch(receiveAgendas(agenda));
    }
};


export const createAgenda = (user) => async(dispatch) => {
    const res = await jwtFetch(`/api/agendas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user
        })
    });
    if(res.ok){
        const agenda = await res.json();
        dispatch(receiveAgenda(agenda))
    };
};

export const editAgenda = (agenda, newAgenda) => async (dispatch) => {
    const res = await jwtFetch(`/api/agendas/${agenda._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            events: newAgenda
        })
    });
    if(res.ok){
        const newAgenda = await res.json();
        dispatch(updateAgenda(newAgenda))
    };
};

export const saveAgenda = (agenda) => async (dispatch) => {
    const res = await jwtFetch(`/api/agendas/${agenda._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            saved: true
        })
    });
    if(res.ok){
        const newAgenda = await res.json();
        dispatch(receiveAgenda(newAgenda))
    };
};

export const deleteAgenda = (agendaId) => async (dispatch) => {
    const res = await jwtFetch(`/api/agendas/${agendaId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(removeAgenda(agendaId));
    };
};

const agendasReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_AGENDAS:
            return { ...action.agendas };
        case UPDATE_AGENDA:
            return { ...state, events: action.payload}
        case RECEIVE_AGENDA:
            return { ...state, [action.agenda._id]: action.agenda }
        case REMOVE_AGENDA:
            const newState = {}
            delete newState[action.agendas._id];
            return newState
        default:
            return state;
    }
}

export default agendasReducer;

