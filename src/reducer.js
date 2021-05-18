export const initialState = {
    user:null
}

export const actionType = {
    SET_USER :"SET_USER"
}

const reducer = (state,action) => {
    switch(action.type){
        case actionType.SET_USER:
            return{
                ...state,
                user:action
            }
        default :
            return state
    }
}

export default reducer;