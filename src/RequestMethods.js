import axios from "axios";

const BASE_URL = "https://api-jstore-app.herokuapp.com/";
const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmZmYTY0NjEzMTlmMjlmYjZkNDRhOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNTAwOTUzMSwiZXhwIjoxNjM1MjY4NzMxfQ.cIJXjvrZZbNv6hKLr_jG-oVxqr-rSkVxuDGMVxo9Wjk";

// const getToken = async () => {
//     const localUser = await JSON.parse(
//         window.localStorage.getItem("persist:root")
//     );
//     if (localUser) {
//         const user = JSON.parse(localUser.user);
//         const userToken = await user.currentUser.Token;
//         return userToken;
//     } else {
//         return "";
//     }
// };

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    },
});
