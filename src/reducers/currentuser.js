const currentuserreducer = (state = null, action) => {
    switch (action.type) {
        case "FETCH_CURRENT_USER":
            // console.log(action.payload)
            return action.payload;
        default:
            return state;
    }
};

export default currentuserreducer;