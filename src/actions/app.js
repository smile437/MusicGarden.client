export const SET_LOADER_STATE = "SET_LOADER_STATE";

export function setLoaderState(value) {
    return {type: SET_LOADER_STATE, payload: value};
}
