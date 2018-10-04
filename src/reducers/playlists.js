const initialState = [
        "playlist1",
        "playlist2"
    ];

export default function playlist(state = initialState,action) {
    switch (action.type)
    {
        case "ADD_PLAYLIST":
            return state;
        case "DELETE_PLAYLIST":
            return state;
        default:
            return state;
    }
}