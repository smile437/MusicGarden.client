import { SET_LOADER_STATE } from './../actions/app';

const initialState = {
    isLoading: false
};

export default function playlist(state = initialState, action) {
    switch (action.type)
    {
        case SET_LOADER_STATE:
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;
    }
}