import { useState } from 'react'
import "./style.css"
import { AuthService } from '../../../service/auth.service.js'
import { Link, useNavigate } from 'react-router-dom'
import { getLocalStorage, setLocalStorage } from '../../../storage/LocalStorage.js'
import { useDispatch } from 'react-redux'
import { setAuthenticated } from '../../../reducers/app.reducer.js'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"




const Login = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    });
    const t = getLocalStorage("token")
    console.log(t.token)

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleSubmit = async () => {
        try {
            const validationErrors = validateForm();
            if (Object.values(validationErrors).some((error) => error !== '')) {

                setFormErrors(validationErrors);
                return;
            }
            const res = await AuthService.login(JSON.stringify(formData))
            if (!res.success) {
                alert(res.message)

            }
            else {
                setLocalStorage("token", res.data.token)
                setLocalStorage("user", res.data.user.id)
                dispatch(setAuthenticated(true))
                navigate("/")
            }
        }
        catch (error) {
            console.log(error);
        }

    };
    const validateForm = () => {
        const errors = {
            email: formData.email.trim() === '' ? 'Email cannot be empty' : '',
            password: formData.password.trim() === '' ? 'Password cannot be empty' : '',
        };

        return errors;
    };
    return (
        <div className="mainContainer">
            <div className={"titleContainer"}>
                <div>Login</div>
            </div>
            <br />
            <div className="inputContainer">
                <Input
                    value={formData.email}
                    placeholder="Enter your email here"
                    name="email"
                    type="email"
                    onChange={handleInputChange}
                    className={"inputBox"} />
                <label className="errorLabel">{formErrors.email}</label>
            </div>
            <br />
            <div className="inputContainer">
                <Input
                    value={formData.password}
                    name="password"
                    type="password"
                    placeholder="Enter your password here"
                    onChange={handleInputChange}
                    className={"inputBox"} />
                <label className="errorLabel">{formErrors.password}</label>
            </div>
            <br />
            <div className="inputContainer">
                <Button
                    variant="outline"
                    className="button"
                    onClick={handleSubmit}>Login</Button>
            </div>

            <div className='linkContainer'>
                <Link to="/signup">Dont have an account? Sign up!</Link>
            </div>

        </div>
    )



}

export default Login



