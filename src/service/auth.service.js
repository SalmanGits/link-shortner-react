import { NetworkConfiguration, APIURL } from "../network/NetworkConfiguration.js";
import { callAPI } from "../network/NetworkConnection.js"


const login = (body) => {
    return callAPI(APIURL + NetworkConfiguration.LOGIN, "POST", body, {});
};
const signup = (body) => {
    return callAPI(APIURL + NetworkConfiguration.SIGNUP, "POST", body, {});
};

export const AuthService = {
    login,
    signup
};