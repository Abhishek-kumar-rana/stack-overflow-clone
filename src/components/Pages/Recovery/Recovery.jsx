import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { motion } from 'framer-motion';
import './Recovery.css';
import { useDispatch } from 'react-redux';
import { changepass, sendotp } from '../../../action/auth';
import { Link, useNavigate } from 'react-router-dom';
// import { requestpass } from '../../../action/auth';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';  // Import the spinner icon
import { IoRepeat } from "react-icons/io5";

const Recovery = () => {
    const [otp, setOtp] = useState('');
    const [emailnumber, setEmailNumber] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [otpError, setOtpError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [showotp,setshowotp]=useState(false);
    const [clientotp,setclientotp]=useState('');
    const [canreset,setcanreset]=useState(false);
    const [loading, setLoading] = useState(false);  // New loading state
    const [generatedpassword,setgeneratedpassword]=useState('');
    const [clickable,setclickable]=useState(true);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    // useEffect(()=>{
    //     async function getIpAddress() {
    //         try {
    //             const response = await fetch('https://api.ipify.org?format=json');
    //             const data = await response.json();
    //             return data.ip; // Returns the IP address
    //         } catch (error) {
    //             console.error('Error fetching IP address:', error);
    //             return null;
    //         }
    //     }
        
    //     // Usage
    //     getIpAddress().then(ip => console.log('Your IP Address is:', ip));
        
    // },[]);

    const sendOtp = async () => {
        if (!emailnumber.trim()) {
            setErrorMessage('Please enter an email or phone number.');
            return;
        }
        setLoading(true);
        setErrorMessage('');
        setclickable(false);

        // Generate OTP and store it in state
        const generatedOtp = await generateOtp();
        setclientotp(generatedOtp);  // Store OTP in state

        const gotp=generatedOtp;
        const email=emailnumber
        const data = { gotp, email };
        const isOnlyNumbers = /^[+]?[\d]+$/.test(email);
        console.log(data);


        // try {
        // const response = await fetch('http://localhos:5000/otp-sen', { 
        //     method: 'POST',
        //     headers: {
        //     'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data), // Send the data to the backend
        // });
        try {
            if(isOnlyNumbers){
                const response1 = await fetch('https://server-coral-psi-28.vercel.app/auth/validphone', { 
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({emailnumber}), // Send the data to the backend
                });
                const result = await response1.json();
                console.log(result); // Handle response from the backend
                if(result.success){
                //     const response = await fetch('http://localhos:5000/otp-sen', { 
                //         method: 'POST',
                //         headers: {
                //         'Content-Type': 'application/json',
                //         },
                //         body: JSON.stringify({gotp,email:result.email}), // Send the data to the backend
                // });
                        dispatch(sendotp({gotp,email:result.email}));
                setshowotp(true);
                }else{
                    alert(result.message);
                }
                


            }else{
                const response1 = await fetch('https://server-coral-psi-28.vercel.app/auth/validgmail', { 
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({emailnumber}), // Send the data to the backend
                });
                const result = await response1.json();
                console.log(result); // Handle response from the backend
                if(result.success){
                //     const response = await fetch('http://localhos:5000/otp-sen', { 
                //         method: 'POST',
                //         headers: {
                //         'Content-Type': 'application/json',
                //         },
                //         body: JSON.stringify({gotp,email:result.email}), // Send the data to the backend
                // });
                        dispatch(sendotp({gotp,email:result.email}))
                setshowotp(true);
                }else{
                    alert(result.message);
                }
                
            }
            

        // const result = await response.json();
        // console.log(result); // Handle response from the backend

        } catch (error) {
        console.error('Error:', error);
        }
        setclickable(true);
        
        setLoading(false);
        console.log('OTP sent to:', emailnumber);
        console.log('Generated OTP:', generatedOtp); // This is just for testing, remove in production
    };

    const handleOtpChange = (otpValue) => {
        setOtp(otpValue);
        if (otpValue.length === 4) {
            handleOtpVerification(otpValue, emailnumber); // Pass emailnumber
        }
    };
    

    // Generates a 4-digit OTP (adjust comment to match logic)
    const generateOtp = async () => {
        const gotp = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit OTP
        return gotp;
    };
    
    const requestPasswordReset = async (emailnumber) => {
        try {
            const response = await fetch('https://server-coral-psi-28.vercel.app/auth/requestpassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailnumber })
            });
    
            const textResponse = await response.text();
            console.log(textResponse);
    
            let result;
            try {
                result = JSON.parse(textResponse);
            } catch (error) {
                console.error("Failed to parse response as JSON:", error);
                return;
            }
    
            if (response.ok) {
                if (result.canResetPassword) {
                    console.log(result.success); 
                    setcanreset(true);
                }
                else if(!result.canResetPassword){
                    alert("Password reset request already made today. Please try again tomorrow.");
                    setOtpVerified(false)
                }
                 else {
                    console.warn(result.error);
                }
            } else {
                console.error(result.error);
            }
        } catch (error) {
            console.error('An error occurred while requesting password reset:', error);
        }
    };
    
      
    const handleOtpVerification = async (otpValue, emailnumber) => {
        const isOtpCorrect = parseInt(otpValue) === clientotp;
        if (isOtpCorrect) {
            setOtpVerified(true);
            requestPasswordReset(emailnumber); // emailnumber needs to be passed here correctly
            setOtpError('');
        } else {
            setOtpError('Invalid OTP. Please try again.');
        }
    };
    
      

    // Validates password and displays errors if invalid
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length < 8) {
            setConfirmPasswordError('Password must be at least 8 characters.');
        } else {
            setConfirmPasswordError('');
        }
    };

    // Validates confirm password and displays errors if mismatch
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (e.target.value !== password) {
            setConfirmPasswordError('Passwords do not match.');
        } else {
            setConfirmPasswordError('');
        }
    };

    // Validates and handles form submission
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords don't match. Please try again.");
        } else if (passwordError) {
            setConfirmPasswordError('Please enter a valid password.');
        } else {
            setConfirmPasswordError('');
            setPasswordError('');
            setLoading(true);

            
            if (canreset) {
                const authdata = { emailnumber, newPassword: password };
                dispatch(changepass(authdata));
                console.log('Password successfully reset!');
                alert('Password successfully reset!');
                setLoading(false);
                navigate('/auth');
            } else {
                console.log('Cannot reset password. OTP not verified or time limit restrictions.');
                alert('Cannot reset password. OTP not verified or time limit restrictions.');
            }
        }
        setLoading(false);
    };
    
    const generatePassword = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let password = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    setgeneratedpassword(password);
    
    };

    return (
        <section className='auth-sections'>
            <div className="auth-containers">
                <form >
                    <div style={{margin:'0px'}}>
                        <h3 style={{margin:'0px'}}>Account Recovery</h3>
                        <p style={{maxWidth:'260px',fontSize:'15px',color:'grey'}}>Forgot your account’s password? Verify your email address or phone number then reset your password.</p>
                    </div>

                    {/* Email/Phone Input */}
                    {!otpVerified && (
                        <motion.div
                            className='input-container'
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className='input-label'>Enter:</span>
                            <br />
                            <input
                                type="text"
                                value={emailnumber}
                                onChange={(e) => setEmailNumber(e.target.value)}
                                className='input-email'
                                placeholder='Email or Phone Number'
                            />
                            {/* //xzeYOsBH */}
                            <br />
                            <button 
                            style={{marginTop:'20px'}}
                                className='auth-btn'
                                type="button"
                                onClick={sendOtp}
                                disabled={emailnumber === '' || !clickable}
                            >
                                 {loading ? (
                                    <AiOutlineLoading3Quarters className="spinner" />  // Display spinner when loading
                                ) : (
                                    'Send OTP'
                                )}
                            </button>
                            {errorMessage && <p className="error">{errorMessage}</p>}
                            
                        </motion.div>
                    )}

                    {/* OTP Input */}
                    {!otpVerified && showotp  && (
                        <motion.div
                            className='otp-container'
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <OtpInput
                                value={otp}
                                onChange={handleOtpChange}
                                numInputs={4}
                                renderInput={(props) => (
                                    <motion.input {...props} className="otp-input" />
                                )}
                            />
                            {otpError && <p className="error">{otpError}</p>}
                            {!otpError && <p className="error" style={{color:'green'}}>OTP sent</p>}
                        </motion.div>
                    )}

                    {/* Password Reset Fields (shown after OTP verification) */}
                    {otpVerified && (
                        <>
                        
                            {emailnumber && <p style={{margin:'0px 0px'}}>Your account : {emailnumber}</p>}
                            <div className='gpass-container'>
                                
                                <div>Generated Password: 
                                 
                                <span>{generatedpassword}</span> 
                                    <button type="button" onClick={() => generatePassword(8)}><IoRepeat size={20}/></button>
                                    
                                    </div>
                            </div>
                        <motion.div
                            className='password-container'
                            initial={{ opacity: 0, y: 70 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className='input-email'
                                placeholder='Enter new password'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            />
                            {/* {passwordError? <p className="error">{passwordError}</p>:<p> </p>} */}

                            
                            <motion.input
                                type="password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className='input-email'
                                placeholder='Confirm new password'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            />
                            
                        </motion.div>
                        {confirmPasswordError? <p className="error">{confirmPasswordError}</p>:<p> </p>}

                        <motion.button
                            type="button"
                            onClick={handleSubmit}
                            className='auth-btn'
                            disabled={
                                password === '' ||
                                confirmPassword === '' ||
                                password !== confirmPassword ||
                                password.length < 8
                            }
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                             {loading ? (
                                    <AiOutlineLoading3Quarters className="spinner" />  // Display spinner when loading
                                ) : (
                                    'Reset Password'
                                )}
                        </motion.button>
                        </>
                    )}
                </form>
            </div>
        </section>
    );
};

export default Recovery;
