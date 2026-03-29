const initialState = {
    mnthlyAvrgs: [],
};

const averagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GETAVERAGES":
            return {
                ...state,
                mnthlyAvrgs: [action.mnthlyAvrgs]
            };
        default:
            return state;
    }
}

export default averagesReducer