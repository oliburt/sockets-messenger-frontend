import actionTypes from "./actionTypes"


const manageDisplays = (state = {
    mainDisplay: 'None'
}, action) => {
    switch (action.type) {
        case actionTypes.SET_MAIN_DISPLAY:
            return {
                ...state,
                mainDisplay: action.payload
            }

        default:
            return state
    }
}

export default manageDisplays;