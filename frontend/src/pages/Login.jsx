import React from 'react'
import '../index.css'
import { useState } from 'react'
import Footer from '../components/Footer'
import logo from '../assets/fevicon (1).jpeg'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { FormControl } from '@mui/material'
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { backendURL } from '../App.jsx'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'



function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');

    const handleLogin =async () => {
        const { data } = await axios.post(`${backendURL}/users/login`, {
            email,
            password,
        }, {
            headers: {
                "Content-Type":"application/json"
            },
            withCredentials: true,

        })
        if (!data.success) {
            return toast.error(data.message);
        }
    toast.success(data.message);
    navigate('/home');
    window.location.reload();
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <div className='bgcolor w-full min-h-screen flex justify-between items-center flex-col  z-0'>
                <div className='flex items-center justify-center my-auto h-5/6 w-full'>
                    <div className='w-1/3 h-full rounded-lg z-10 bg-white flex items-center justify-center flex-col  shadow-2xl' >
                        <div className=' flex flex-col items-center justify-center w-full h-full p-5 border-b border-black'>
                            <img src={logo} alt="" className='w-16 h-16' />
                            <span className='text-center text-2xl font-semibold'>User Login</span>

                        </div>
                        <div className='flex flex-col justify-center items-center gap-4 my-7'>
                            <TextField id="outlined-basic" label="Email Address" variant="outlined" fullWidth type={'email'} value={email} onChange={(e) => setEmail(e.target.value)} />
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            <button className='btn btn-primary' type='submit' onClick={handleLogin}>Login</button>
                        </div>
                    </div>
                </div>
                <div className='w-full h-1/6 bg-white'>
                    <Footer />
                </div>
            </div>

        </>
    )
}

export default Login;