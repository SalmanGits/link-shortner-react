import { useState } from 'react'
import "./style.css"
import { AuthService } from '../../../service/auth.service.js'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"




const Signup = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
        name: ''
    });


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
            const res = await AuthService.signup(JSON.stringify(formData))
            if (!res.success) {
                alert(res.message)

            }
            else {
                navigate("/login")
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
            name: formData.name.trim() === '' ? 'Name cannot be empty' : '',
        };

        return errors;
    };
    return (
        <div className={"mainContainer"}>
            <div className={"titleContainer"}>
                <div>Signup</div>
            </div>
            <br />
            <div className={"inputContainer"}>
                <Input
                    value={formData.name}
                    placeholder="Enter your name here"
                    name="name"
                    type="text"
                    onChange={handleInputChange}
                    className={"inputBox"} />
                <label className="errorLabel">{formErrors.name}</label>
            </div>
            <br />
            <div className={"inputContainer"}>
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
            <div className={"inputContainer"}>
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
            <div className={"inputContainer"}>
                <Button
                    variant="outline"
                    className="button"
                    onClick={handleSubmit}>Signup</Button>
            </div>

            <div className='linkContainer'>
                <Link to="/login">have an account? Login !</Link>
            </div>

        </div>
    )



}

export default Signup



