import axios from "axios";

const API=axios.create({
    // baseURL:"http://localhost:5000/"
    baseURL:"https://server-coral-psi-28.vercel.app/"
});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("Profile")){
        req.headers.Authorization=`Bearer ${
            JSON.parse(localStorage.getItem("Profile")).token
        }`;
    }
    return req;
})

export const login=(authdata)=>API.post("user/login",authdata);
export const signup=(authdata)=>API.post("user/signup",authdata);
export const getallusers=()=> API.get("/user/getallusers");
export const changepass=(authdata)=>API.post("auth/changepassword",authdata);
export const updateprofile=(id,updatedata)=>API.patch(`user/update/${id}`,updatedata)
export const updatenotification=(id,notificationdata)=>API.patch(`user/updateNotification/${id}`,notificationdata);
export const validusers = (authdata) => API.post("auth/validaccount", authdata);
export const transferpoints = (authdata) => API.post("user/transferPoints", authdata);

export const postquestion=(questiondata)=>API.post("/questions/Ask",questiondata);
export const getallquestions=()=>API.get("/questions/get");
// getallquestions()
//   .then(response => {
//     console.log(response.data);  // Logs the data returned by the API
//   })
//   .catch(error => {
//     console.error("Error fetching questions:", error);  // Logs any errors
//   });

export const otp=(data)=>API.post("/otp-send",data);
export const userdata=()=>API.get("/user/userdata");




export const deletequestion=(id)=>API.delete(`/questions/delete/${id}`);
export const votequestion=(id,value)=>API.patch(`/questions/vote/${id}`,{value});

export const voteanswer=(id,value,userid,answerid,votterid)=>API.patch(`/answer/voteanswer/${id}`,{value,userid,answerid,votterid});


export const postanswer=(id,noofanswers,answerbody,useranswered)=>API.patch(`/answer/post/${id}`,{noofanswers,answerbody,useranswered});
export const deleteanswer=(id,answerid,noofanswers)=>API.patch(`/answer/delete/${id}`,{answerid,noofanswers});

 