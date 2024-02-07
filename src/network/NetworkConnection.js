import { getLocalStorage } from "../storage/LocalStorage";


export const callAPI = async (url, method, body, requestHeaders) => {
    try {
        const token = getLocalStorage("token");
        const userToken = token.token;

        if (userToken && userToken.length > 0) {
            requestHeaders["Authorization"] = userToken;
        }
        if (method === "POST" || method === "PUT") {
            requestHeaders["Content-Type"] = "application/json";
        }
        const response = await fetch(url, {
            method: method,
            headers: requestHeaders,
            body: body,
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log("err", error);
        return error
        
    }
};