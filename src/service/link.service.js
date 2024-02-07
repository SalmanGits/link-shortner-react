import { NetworkConfiguration, APIURL } from "../network/NetworkConfiguration.js";
import { callAPI } from "../network/NetworkConnection.js"


const create = (body) => {
    return callAPI(APIURL + NetworkConfiguration.CREATE, "POST", body, {});
};
const get = (body) => {
    return callAPI(APIURL + NetworkConfiguration.GET, "POST", body, {});
}
const edit = (body) => {
    return callAPI(APIURL + NetworkConfiguration.EDIT, "PUT", body, {});
}
const deleteLink = (id) => {
    return callAPI(APIURL + NetworkConfiguration.DELETE + id, "DELETE", {}, {});
}


export const LinkService = {
    create,
    get,
    edit,
    deleteLink
};