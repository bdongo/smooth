import jwtFetch from "./jwt";

export const GET_REVIEWS = 'GET_REVIEWS';
export const ADD_REVIEW = 'ADD_REVIEW';
export const UPDATE_REVIEW = 'UPDATE_REVIEW';
export const DELETE_REVIEW = 'DELETE_REVIEW';

export const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
});

export const addReview = (payload) => ({
    type: ADD_REVIEW,
    payload
});

export const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    review
});

export const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
});


export const createReview = (review) => async (dispatch) => {
    const res = await jwtFetch(`/api/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });
    if (res.ok) {
        const newReview = await res.json();
        dispatch(addReview(newReview));
    }
}

export const editReview = (review) => async (dispatch) => {
    const res = await jwtFetch(`/api/reviews/${review._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });
    if (res.ok) {
        const payload = await res.json();
        dispatch(addReview(payload));
    }
}

export const removeReview = (reviewId) => async (dispatch) => {
    const res = await jwtFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(deleteReview(reviewId));
    }
}

export default function reviewsReducer(state = {}, action) {
    switch (action.type) {
        // case GET_REVIEWS:
        //     const newState = {};
        //     action.reviews.forEach(review => {
        //         newState[review._id] = review;
        //     });
        //     return newState;
        // case ADD_REVIEW:
        //     return {
        //         ...state,
        //         [action.payload.review.id]: action.payload.review
        //     };
        // case UPDATE_REVIEW:
        //     return {
        //         ...state,
        //         [action.review.id]: action.review
        //     };
        case DELETE_REVIEW:
            const updatedState = { ...state };
            delete updatedState[action.reviewId];
            return updatedState;
        default:
            return state;
    }
}