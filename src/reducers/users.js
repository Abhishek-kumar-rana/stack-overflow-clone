const usersreducer = (states = [], action) => {
    switch (action.type) {
      case "FETCH_USERS":
        return action.payload;
        
      case "UPDATE_CURRENT_USER":
        return states.map((state) =>
          state._id === action.payload._id ? action.payload : state
        );
        
        case "UPDATE_NOTIFICATION":
            
            return states.map((state) =>
              state._id === action.payload._id
                ? { ...state, notificationsEnabled: action.payload.notificationsEnabled, fcmtoken: action.payload.fcmtoken }
                : state
            );
        
      default:
        return states;
    }
  };
  
  export default usersreducer;
  