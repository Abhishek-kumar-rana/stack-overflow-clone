import * as api from "../api"
export const fetchallusers=()=> async(dispatch)=>{
    try {
        const {data}=await api.getallusers();
        dispatch({type:"FETCH_USERS",payload:data});
    } catch (error) {
        console.log(error)
    }
}

export const updateprofile = (id, updatedata) => async (dispatch) => {
    try {
      const { data } = await api.updateprofile(id, updatedata); // Fetch updated data
      dispatch({ type: "UPDATE_CURRENT_USER", payload: data });
      
      const storedProfile = JSON.parse(localStorage.getItem("Profile"));
      if (storedProfile) {
        storedProfile.result = data; // Update the local storage profile
        localStorage.setItem("Profile", JSON.stringify(storedProfile));
        // Dispatch the updated profile from localStorage
        dispatch({ type: "FETCH_CURRENT_USER", payload: storedProfile });
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  

export const updatenotification = (id, notificationdata) => async (dispatch) => {
    try {
        const { data } = await api.updatenotification(id, notificationdata);
        dispatch({ type: "UPDATE_NOTIFICATION", payload: data });
    } catch (error) {
        console.error("Error updating notification", error);
    }
};


export const TransferPoints = (senderId, recipientId, amount) => async (dispatch) => {
  try {
      // console.log(userid,answerid);
      await api.transferpoints(senderId, recipientId, amount);
      dispatch(fetchallusers())
  } catch (error) {
      console.log(error)
      alert(error.message)
  }
}

export const userdataa = () => async (dispatch) => {
  try {
      
      const user=await api.userdata();
      // dispatch(fetchallquestion())
      console.log(user)
      return user;
  } catch (error) {
      console.log(error)
  }
}

