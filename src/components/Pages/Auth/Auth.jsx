import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import "./Auth.css"
import icon from '../../../assets/icon.png'
import Aboutauth from './Aboutauth'
import { signup, login, checkgmail, sendotp } from '../../../action/auth'
import { initializePushNotifications, setupMessageListener } from './PushNotification.js'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { userdataa } from '../../../action/users.js';

const Auth = () => {
    const [issignup, setissignup] = useState(false)
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fcmtoken, setfcmtoken] = useState("");
    const [notificationsEnabled, setnotificationsEnabled] = useState(false);
    const [loginDetails, setloginDetails] = useState(null);
    const [ischrome, setischrome] = useState(false);
    const [otp, setotp] = useState('');
    const [showotp, setshowotp] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [inputotp, setinputotp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [clickable, setclickable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState('');
    const [phone,setphone]=useState('');


    useEffect(() => {
        const fetchToken = async () => {
            try {
                const { token, notificationsEnabled } = await initializePushNotifications();
                if (token) {
                    setfcmtoken(token);
                    setnotificationsEnabled(notificationsEnabled);
                    console.log('Token obtained:', token);
                }
            } catch (error) {
                console.error('Error fetching FCM token:', error);
            }
        };
        fetchToken();

        setupMessageListener();

        const fetchUserDetails = async () => {
            try {
                console.log("hiii")
                const response = await fetch('https://server-coral-psi-28.vercel.app/user/userdata');
                // const response=dispatch(userdataa());
                if (!response.ok) throw new Error('Failed to fetch user details');

                const data = await response.json();
                // console.log(response)
                // console.log("data",data);
                setloginDetails({
                    message: data.message || "Unknown",
                    browser: data.browser || "Unknown",
                    os: data.os || "Unknown",
                    device: data.device || "Unknown",
                    ip: data.ip || "Unknown",
                });

                if (data.login === 'false') {
                    alert(data.error);
                    navigate('/');
                }
                if (data.browser === 'Chrome') setischrome(true);
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchUserDetails();
    }, []);

    useEffect(() => {
        if (fcmtoken) {
            console.log('FCM Token state updated:', fcmtoken);
        }
    }, [fcmtoken]);

    const handlesubmit =async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Enter email and password");
            return;
        }

        if (fcmtoken) {
            console.log("token arrived", fcmtoken);
        }

        if (issignup) {
            if (!name) {
                alert("Enter a name to continue");
                return;
            }
            if (!phone) {
                alert("Enter a phone number to continue");
                return;
            }
            // if (ischrome) return;

            dispatch(signup({ name, email, password, fcmtoken, notificationsEnabled, loginDetails,phone }, navigate));
        } else {
            

            if (ischrome) {
                try {
                    const authdata={ email, password }
                    const response = await dispatch(checkgmail(authdata)); // Await dispatch result
        
                    if (response.ok) { // Check if the response was successful
                        setshowotp(true);
                        sendOtp();  // Call sendOtp after success
                    } else {
                        console.log('Gmail check failed', response);
                    }
                } catch (error) {
                    console.error('Error checking Gmail:', error);
                }
            } else {
                dispatch(login({ email, password, fcmtoken, notificationsEnabled, loginDetails }, navigate));
            }
        }
    }

    const handleswitch = () => {
        setissignup(!issignup);
        setname("");
        setemail("");
        setpassword("");
    }

    const generateOtp = async () => {
        const gotp = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit OTP
        return gotp;
    };

    const sendOtp = async () => {
        if (!email.trim()) {
            setErrorMessage('Please enter an email or phone number.');
            return;
        }
        setLoading(true);
        setErrorMessage('');
        setclickable(true);

        const generatedOtp = await generateOtp();
        setotp(generatedOtp);  // Store OTP in state

        const data = { gotp: generatedOtp, email }; // Email state used here

        try {
            // const response = await fetch('http://localhos:5000/otp-sen', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data),
            // });

            const response=dispatch(sendotp(data));

            // const result = await response.json();
            // console.log("result",result); // Handle response from the backend
        } catch (error) {
            console.error('Error:', error);
        }
        setclickable(true);
        setshowotp(true);
        setLoading(false);
        console.log('OTP sent to:', email);  // Corrected 'emailnumber' to 'email'
        console.log('Generated OTP:', generatedOtp);
    };

    const handleOtpChange = (otpValue) => {
        setinputotp(otpValue);
        if (otpValue.length === 4) {
            handleOtpVerification(otpValue);
        }
    };

    const handleOtpVerification = async (otpValue) => {
        const isOtpCorrect = parseInt(otpValue) === parseInt(otp);
        if (isOtpCorrect) {
            setOtpVerified(true);
            setOtpError('');
            setLoading(true);
            dispatch(login({ email, password, fcmtoken, notificationsEnabled, loginDetails }, navigate));
        } else {
            setOtpError('Invalid OTP. Please try again.');
        }
    };

    return (
        <section className="auth-section">
            <div className='left-about'>{issignup && <Aboutauth />}</div>

            <div className="auth-container-2">
                {!issignup && <img src={icon} alt="icon" className='login-logo' />}

                <form onSubmit={handlesubmit}>
                    {issignup && (
                        <label htmlFor="name">
                            <h2 style={{margin:'0'}}>Create your account</h2>
                        </label>
                    )}

                    {issignup && (
                        <label htmlFor="name">
                            <h4 style={{ color: "#3b3f44" }}>Display Name</h4>
                            <input type="text" id='name' name='name' value={name} onChange={(e) => setname(e.target.value)} />
                        </label>
                    )}
                    {issignup && (
                        <label htmlFor="number">
                        <h4 style={{ color: "#3b3f44" }}>Phone Number</h4>
                        <input type="text" id='number' name='number' value={phone} onChange={(e) => setphone(e.target.value)} 
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                        />
                    </label>
                    )}
                    <label htmlFor="email">
                        <h4 style={{ color: "#3b3f44" }}>Email</h4>
                        <input type="email" id='email' name='email' value={email} onChange={(e) => setemail(e.target.value)} />
                    </label>
                    <label htmlFor="password">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h4 style={{ color: "#3b3f44" }}>Password</h4>
                            {!issignup && (
                                <Link to={'./Recovery'}>
                                    <p style={{ color: "#007ac6", fontSize: "13px" }}>Forgot Password?</p>
                                </Link>
                            )}
                        </div>
                        <input type="password" style={{ marginBottom: '17px' }} name="password" id="password" value={password} onChange={(e) => setpassword(e.target.value)} />
                    </label>
                    <button type='submit' className='auth-btn' style={{backgroundColor: clickable?'#c7ced2':''}} disabled={email === '' || clickable}>
                        {issignup ? "Sign up" : (
                            <>
                                {loading ? <AiOutlineLoading3Quarters className="spinner" /> : 'Log in'}
                            </>
                        )}
                    </button>

                    {!otpVerified && showotp && (
                        <motion.div
                            className='otp-container'
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <OtpInput
                                value={inputotp} // Corrected from 'otp' to 'inputotp'
                                onChange={handleOtpChange}
                                numInputs={4}
                                renderInput={(props) => (
                                    <motion.input {...props} className="otp-input" />
                                )}
                            />
                            {otpError && <p className="error">{otpError}</p>}
                            {!otpError && !loading && <p className="error" style={{ color: 'green' }}>OTP sent</p>}
                        </motion.div>
                    )}

                </form>

                <p>
                    {issignup ? "Already have an account?" : "Don't have an account"}
                    <button type='button' className='handle-switch-btn' onClick={handleswitch}>
                        {issignup ? "Log in" : "Sign up"}
                    </button>
                </p>
                {issignup && <div className='breakline'></div>}
            </div>
        </section>
    )
}

export default Auth;
