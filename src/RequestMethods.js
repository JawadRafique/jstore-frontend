import axios from "axios";

const BASE_URL = "https://api-jstore-app.herokuapp.com/";
const tokeTest = JSON.parse(window.localStorage.getItem("persist:root"));
console.log.apply("toke", tokeTest);
const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmZmYTY0NjEzMTlmMjlmYjZkNDRhOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNTAwOTUzMSwiZXhwIjoxNjM1MjY4NzMxfQ.cIJXjvrZZbNv6hKLr_jG-oVxqr-rSkVxuDGMVxo9Wjk";

const getToken = async () => {
    const localUser = await JSON.parse(
        window.localStorage.getItem("persist:root")
    );
    const userToken = await JSON.parse(localUser.user).currentUser.Token;
    return userToken;
};

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
});
