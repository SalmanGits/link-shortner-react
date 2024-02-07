/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom"
import { getLocalStorage } from '../../../storage/LocalStorage.js';

const ProtectedRoute = ({ children }) => {
    const token = getLocalStorage("token")
    console.log(token)
    let location = useLocation();
    if (!token.token) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children

};

export default ProtectedRoute;