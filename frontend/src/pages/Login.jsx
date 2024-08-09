import React from 'react'
import '../index.css'
import { useState } from 'react'
import Footer from '../components/Footer'
import logo from '../assets/fevicon (1).jpeg'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { FormControl } from '@mui/material'
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <div className='bgcolor w-full min-h-screen flex justify-center items-center flex-col py-28 z-0'>
                <div className='w-1/3 rounded-lg min-h-fit bg-white flex items-center justify-center flex-col py-6 shadow-2xl' >
                    <img src={logo} alt="" className='w-16 h-16' />
                    <span className='text-center text-2xl font-semibold'>User Login</span>
                    <hr />
                    <div className='flex flex-col justify-center items-center gap-4 my-7'>
                        <TextField id="outlined-basic" label="Email Address" variant="outlined" fullWidth type={'email'} value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
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
                        <button className='btn btn-primary'>Login</button>
                    </div>
                </div>
            <Footer />
            </div>

        </>
    )
}

export default Login;