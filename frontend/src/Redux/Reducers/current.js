const initialState = {
    current: []
};

const currentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GETCURRENTS":
            return {
                ...state,
                current: [action.current]
            };
        default:
            return state;
    }
}

export default currentsReducer