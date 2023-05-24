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
    // const len = Object.values(state.agendas).length
    // return state?.agendas ? Object.values(state.agendas)[len - 1] : null;

    if (state?.agendas) {
        const agendaArr = Object.values(state.agendas)
        const unsavedAgenda = agendaArr.find(obj => obj.saved === false);
        return unsavedAgenda ? unsavedAgenda : null
    }
}

export const getSavedAgendas = state => {
    // const len = Object.values(state.agendas).length
    // return state?.agendas ? Object.values(state.agendas)[len - 1] : null;

    if (state?.agendas) {
        const agendaArr = Object.values(state.agendas)
        const savedAgendas = agendaArr.filter(obj => obj.saved === true);
        return savedAgendas ? savedAgendas : null
    }
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
        dispatch(receiveAgenda(agenda));
    }
};


export const createAgenda = (user, event = []) => async(dispatch) => {
    const res = await jwtFetch(`/api/agendas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user,
            event
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
        dispatch(receiveAgenda(newAgenda))
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
        dispatch(updateAgenda(newAgenda))
    };
};

export const reviseAgenda = (agenda, time, budget) => async (dispatch) => {
    if(!agenda) return;
    const res = await jwtFetch(`/api/agendas/${agenda._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            time: time,
            budget: budget
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
            return { ...state, [action.payload._id]: action.payload}
        case RECEIVE_AGENDA:
            return { ...state, [action.agenda._id]: action.agenda }
        case REMOVE_AGENDA:
            const newState = { ...state }
            delete newState[action.agendaId];
            return newState
        default:
            return state;
    }
}

export default agendasReducer;

