import {loadTracks} from "../actions/tracks";

const initialState = [];

const FETCH_TRACK_SUCCESS = "FETCH_TRACK_SUCCESS";
const ADD_TRACK = "ADD_TRACK";

export default function playlist(state = initialState, action) {
    switch (action.type) {
        case ADD_TRACK:
            return [
                ...state,
                action.payload
            ];
        case FETCH_TRACK_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}