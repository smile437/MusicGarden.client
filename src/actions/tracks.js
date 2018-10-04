import axios from 'axios';
import {setLoaderState} from "./app";
import {JWS, JWS_Find} from "../JSW_Api";

/*let mockApiData = [
    {
        id: 1,
        name: "song1"
    },
    {
        id: 2,
        name: "song2"
    },
    {
        id: 3,
        name: "song3"
    },
    {
        id: 4,
        name: "song4"
    },
    {
        id: 5,
        name: "song5"
    },
    {
        id: 6,
        name: "song6"
    },
    {
        id: 7,
        name: "song7"
    },
    {
        id: 8,
        name: "song8"
    },
    {
        id: 9,
        name: "song9"
    },
    {
        id: 10,
        name: "song10"
    },
    {
        id: 11,
        name: "song11"
    },
    {
        id: 12,
        name: "song12"
    },
    {
        id: 13,
        name: "song13"
    },
    {
        id: 14,
        name: "song5_1"
    },
    {
        id: 15,
        name: "song5_2"
    }
];*/

export const FETCH_TRACK_SUCCESS = "FETCH_TRACK_SUCCESS";
export const ADD_TRACK = "ADD_TRACK";
export const FIND_TRACK = "FIND_TRACK";

export const getTracksAsync = () =>(dispatch) => {
    axios({
        url: JWS,
        timeout: 25000,
        method: "get",
        responseType: "json"
    })
        .then((response) => response.data)
        .then((mockApiData) => {
            setTimeout(function(){
                //dispatch({type: FETCH_TRACK_SUCCESS, payload: mockApiData});
            }, 100);
        })
};

export function addTrack(payload) {
    return {type: ADD_TRACK, payload};
}

export function findTrack(title) {
    return {type: FIND_TRACK, payload: title};
}

export const findTrackExtend = (title) => async (dispatch) => {
    if (title.length > 0) {
        console.log("entered");
        let r = await axios({
            url: JWS_Find + title,
            timeout: 25000,
            method: "get",
            responseType: "json"
        }).then((response) => {
            console.log("API", response);
            return response.data;
        });
        console.log("completed: ", r);

        dispatch({type: FETCH_TRACK_SUCCESS, payload: r});
    }
};