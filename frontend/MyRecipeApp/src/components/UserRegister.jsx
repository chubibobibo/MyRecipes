import React from 'react';
import FormInput from './FormInput.jsx';
import { useState } from 'react';
import axios, { isCancel, AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';


function UserRegister() {
    //display the title in the FormInput component
    const formName = 'Register New User'
    const navigate = useNavigate()

    //state for gathering input value
    const [formData, setFormData] = useState({ username: '', password: '' });
    const handleChange = (e) => {
        setFormData(oldValue => {
            return {
                //spread the old value then use the taget value for the target name.
                ...oldValue, [e.target.name]: e.target.value
            }
        })
    }

    //handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post('http://localhost:3001/user/register', formData)
            console.log(data)
            setFormData({ username: '', password: '' });
            navigate('/');
            alert('User Created')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <FormInput formName={formName} handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} />
        </div>
    )
}

export default UserRegister