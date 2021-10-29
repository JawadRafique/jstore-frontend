import { publicRequest } from "../RequestMethods";
import {
    loginFailure,
    loginStart,
    loginSuccess,
    registerFailure,
    registerStart,
    registerSuccess,
} from "./userRedux";

export const userLogin = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const userRegistration = async (dispatch, user) => {
    dispatch(registerStart());
    try {
        console.log("User Data before sending", user);
        const res = await publicRequest.post("/auth/register", user);
        console.log("User response", res.data);
        // dispatch(registerSuccess(res.data));
    } catch (err) {
        dispatch(registerFailure());
    }
};
