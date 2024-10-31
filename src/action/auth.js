import * as api from '../api';
import { setcurrentuser } from './currentuser';
import { fetchallusers } from './users';
export const signup =(authdata,naviagte)=> async(dispatch)=>{
    try {
        const {data}=await api.signup(authdata);
        dispatch({type:"AUTH",data})
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
        dispatch(fetchallusers())
        naviagte("/")
    } catch (error) {
        alert(error.response.data.message)
                // console.log(error)
    }
}
export const login =(authdata,naviagte)=> async(dispatch)=>{
    try {
        const{data}=await api.login(authdata);
        dispatch({type:"AUTH",data})
        console.log(data);
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
        naviagte("/")
    } catch (error) {
        // alert("Wrong password!")
        alert(error.response.data.message)
    }
}

export const checkgmail = (authdata) => async (dispatch) => {
    try {
        console.log(authdata)
        const { data } = await api.validusers(authdata);
        console.log(data);
        return { ok: true, data }; // Return a success object
    } catch (error) {
        alert(error.response.data.message);
        return { ok: false }; // Return a failure object
    }
};



export const changepass =(authdata)=> async(dispatch)=>{
    try {
        const{data}=await api.changepass(authdata);
        console.log(data);
       // dispatch({type:"AUTH",data})
       // dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
        //naviagte("/")
    } catch (error) {
        // alert("Wrong password!")
        alert(error.response.data.message)
    }
}

export const sendotp =(data)=> async(dispatch)=>{
    try {
        const{data1}=await api.otp(data);
        console.log(data);
       // dispatch({type:"AUTH",data})
       // dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
        //naviagte("/")
        return data1;
    } catch (error) {
        // alert("Wrong password!")
        alert(error.response.data.message)
    }
}