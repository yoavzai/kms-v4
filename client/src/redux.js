
const initialState = {
    user: {},
}

const appReducer = (state = initialState, action) => 
    {
        const data = action.payload
        switch(action.type) {
            case "user":
                return {...state, user: data}
                
            default:
                return state
        }
    }

export default appReducer