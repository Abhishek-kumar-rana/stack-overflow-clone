import React, { useState } from 'react';
import "./Aibot.css";
import run from './config/gemini';
import { RiLoader5Line } from "react-icons/ri";
import { PiStarFourDuotone } from "react-icons/pi";



const Aibot2 = () => {
  const [otp, setOtp] = useState(''); // useState should be named consistently (setOtp)
  const [email, setEmail] = useState('');
  const [otpCheck, setOtpCheck] = useState({}); // Store otpCheck in state
  const [otpverify,setotpverify]=useState(false);

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [showResults, setShowResults] = useState(false); // Toggle for showing results
  const [loading, setLoading] = useState(false);

  const [emailloader,setemailloader]=useState(false);
  const [otploader,setotploader]=useState(false);

  const generateOtp = () => {
    const gotp = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
    return gotp;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email){
        alert("Please Enter Email.");
        return 
    }

    setemailloader(true);

    const gotp = generateOtp();
    setOtpCheck((prev) => ({ ...prev, [email]: gotp })); // Update otpCheck in state

    console.log(gotp);

    const data = { gotp, email };
    console.log(data);

    try {
      const response = await fetch('https://server-coral-psi-28.vercel.app/otp-send', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send the data to the backend
      });

      const result = await response.json();
      console.log(result); // Handle response from the backend
    } catch (error) {
      console.error('Error:', error);
    }
    setemailloader(false);

    setTimeout(() => {
        // setIsDisabled(false);
      }, 5000);
  };

  const checkSubmit = (e) => {
    e.preventDefault();
    if(!email){
        alert("Please Enter Email.")
        return;
    }
    
    if (parseInt(otp, 10) === otpCheck[email]) {
        console.log('OTP is correct');
        setotpverify(true);
      } else {
        console.log('OTP is wrong');
        alert("OTP Missmatch!")
      }
      
  };

  const handleGenerateResponse = async () => {
    // console.log("loading..")
    setLoading(true);
    if(!otpverify){
        alert("Please verify first...");
        return;
    }
    setemailloader(true);
    
    if(prompt.toLowerCase().includes("java")){
        setResponse("I will not answer Java-related questions.");
        console.log(prompt);
        setLoading(false);
        setShowResults(true);
        setOtp('');
        setOtpCheck({});
        setemailloader(false);
        return ;
    }

    try {
      const result = await run(prompt);
    //   console.log(result); // Log result to inspect its structure
      if(result) setResponse(result); // Adjust based on actual structure of `result`
      setShowResults(true); // Show results after generating response
      setotpverify(false);
      setOtp('');
      setOtpCheck({});

    //   console.log(response);
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("An error occurred. Please try again.");
    } finally {
      setLoading(false);
      // setPrompt('');
    }
    setemailloader(false);
  };

  const handleCardClick = async (input) => {
    
    
    if(!otpverify){
        alert("Please verify first...");
        return;
    }
    setPrompt(input);
    setLoading(true);
    setShowResults(true);
    setemailloader(true);
    try {
      const result = await run(input);
    //   console.log(result); // Log result to inspect its structure
      if(result) setResponse(result); // Adjust based on actual structure of `result`
      setShowResults(true); // Show results after clicking card
      setotpverify(false);
      setOtp('');
      setOtpCheck({});

    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("An error occurred. Please try again.");
    } finally {
      setLoading(false);
      // setPrompt('');
    }
    setLoading(false);
    
    setemailloader(false);
  };

  return (
    <>
      <div className='main'>
      <div className="nav">
        <p>OverFlowAI</p>
      </div>
      <div className='main-container'>
      {!showResults ? (
        
          <>
            <div className="greet">
              <p>
                <span>Hello, coder</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleCardClick("Suggest Some growing programing languages")
                }
              >
                <p>Suggest Some growing programing languages</p>
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Why c program are faster than java program"
                  )
                }
              >
                <p>Why c program are faster than java program</p>
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick("How to Create a Gyroscope using Disc?")
                }
              >
                <p>How to Create a Gyroscope using Disc?</p>
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Create a Script for the YouTube video about coding"
                  )
                }
              >
                <p>Create a Script for the YouTube video about coding</p>
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
            {/* {prompt?<span><PiStarFourDuotone size={30} color='#e7700d'/> {prompt}</span>:<span></span>} */}
            </div>
            <div className="result-data">
              {loading ? (
                <div className="loader-bar">
                    
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <>
                {prompt?<span><PiStarFourDuotone size={30} color='#e7700d'/> {prompt}</span>:<span></span>}
                <p dangerouslySetInnerHTML={{ __html: response }}></p>

                {/* <p>{response}</p> */}
                </>
              )}
            </div>
          </div>
        )}
      </div>

        <div className='search-bar'>
        {!otpverify && <>
           <div className='main-input'>
           <div className='otpverify'>
          {/* <form onSubmit={handleSubmit}> */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <div className="prompt-button">
            <button type="submit" onClick={handleSubmit}>{emailloader?<span className='loader'><RiLoader5Line/></span>:<span>Send</span>}</button>
            </div>
          {/* </form> */}
        </div>
        <div className='otpverify'>
          {/* <form onSubmit={checkSubmit} className='otpform'> */}
            <div>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)} // setOtp instead of setotp
              placeholder="OTP"
            />
            </div>
            <div className='prompt-button'>
            <button type="submit" onClick={checkSubmit}>{otploader?<span className='loader'><RiLoader5Line/></span>:<span>Check</span>}</button>
            </div>
          {/* </form> */}
        </div>
           </div>
        </>}
        {
            otpverify &&
             <>
             <div className='prompt'>
                
                <input
                className='input-field'
                    onChange={(e) => {
                        setPrompt(e.target.value);
                    }}
                    value={prompt}
                    type="text"
                    placeholder="Enter the Prompt Here"
                    />
                    <div className="prompt-button">
                        <button
                            onClick={() => {
                            handleGenerateResponse(); // Call function correctly
                            }}
                        >
                            {emailloader?<span className='loader'><RiLoader5Line/></span>:<span>Send</span>}
                        </button>
                    </div>
                    
                
             </div>
            </>
        }

        </div>
      </div>
    </>
  );
};

export default Aibot2;
