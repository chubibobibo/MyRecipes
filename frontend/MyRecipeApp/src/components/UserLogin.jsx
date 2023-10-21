import React from 'react';
import FormInput from './FormInput';
import { useState } from 'react';
import axios, { isCancel, AxiosError } from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function UserLogin() {
    const navigate = useNavigate();
    //variable to display the form title.
    const formName = 'Login'
    //state for handling changes in input
    const [formData, setFormData] = useState({ username: '', password: '' });
    //setting up cookies
    //access_token is the name of the cookie created (array)
    const [cookie, setCookie] = useCookies(['access_tokens']);

    //function to handleChanges (to be passed as props to child component)
    const handleChange = (e) => {
        setFormData(oldData => {
            return { ...oldData, [e.target.name]: e.target.value }
        });
    }
    //function to handle submission of data
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await axios.post('http://localhost:3001/user/login', formData)
        //saving data from APi(data.data.token) to cookies(access_tokens) 
        setCookie('access_tokens', data.data.token)
        //saving the id of user to local storage
        localStorage.setItem('storedId', data.data.foundUser._id)
        setFormData({ username: '', password: '' });
        console.log(data)
        navigate('/')
    }

    return (
        <div>
            <FormInput formName={formName} handleChange={handleChange} formData={formData} handleSubmit={handleSubmit} />
        </div>
    )
}

export default UserLogin