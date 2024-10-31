const authreducer = (state = { data: null }, action) => {
    switch (action.type) {
        case "AUTH":
            localStorage.setItem("Profile", JSON.stringify({ ...action?.data }));
            // console.log(localStorage.getItem("Profile"));
            return { ...state, data: action?.data };
        case "LOGOUT":
            localStorage.clear();
            return { ...state, data: null }
        default:
            return state;
    }
};
export default authreducer;