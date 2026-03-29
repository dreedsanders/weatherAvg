const initialState = {
    days: []
};

const daysReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GETDAYS":
            return {
                ...state,
                days: [action.days]
            };
        default:
            return state;
    }
}

export default daysReducer