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

export const userRegistration = async (dispatch, regUser) => {
    dispatch(registerStart());
    try {
        await publicRequest.post("/auth/register", regUser);
        dispatch(registerSuccess());
        await userLogin(dispatch, {
            username: regUser.username,
            password: regUser.password,
        })
            .then((result) => {
                dispatch(loginSuccess(result.data));
            })
            .catch(() => {
                dispatch(loginFailure());
            });
    } catch (err) {
        dispatch(registerFailure());
    }
};
