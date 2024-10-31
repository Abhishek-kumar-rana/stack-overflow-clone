import React, { useState } from "react";
import run from "./config/gemini"; // Ensure the file path is correct
import "./Aibot.css";

const GenerativeAIComponent = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [showResults, setShowResults] = useState(false); // Toggle for showing results
  const [loading, setLoading] = useState(false);

  const handleGenerateResponse = async () => {
    // console.log("loading..")
    setLoading(true);
    
    if(prompt.toLowerCase().includes("java")){
        setResponse("I will not answer Java-related questions.");
        console.log(prompt);
        setLoading(false);
        setShowResults(true);

        return ;
    }

    try {
      const result = await run(prompt);
    //   console.log(result); // Log result to inspect its structure
      if(result) setResponse(result); // Adjust based on actual structure of `result`
      setShowResults(true); // Show results after generating response
    //   console.log(response);
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = async (input) => {
    setLoading(true);
    try {
      const result = await run(input);
    //   console.log(result); // Log result to inspect its structure
      if(result) setResponse(result); // Adjust based on actual structure of `result`
      setShowResults(true); // Show results after clicking card
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>OverFlowAI</p>
      </div>
      <div className="main-container">
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
                  handleCardClick("Suggest Some Place To Visit In Kerala")
                }
              >
                <p>Suggest Some Place To Visit In Kerala</p>
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Brainstorm team bonding activities for our work retreat"
                  )
                }
              >
                <p>Brainstorm team bonding activities for our work retreat</p>
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
              {/* Optional title or additional info */}
            </div>
            <div className="result-data">
              {loading ? (
                <div className="loader">
                    
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: response }}></p>

                // <p>{response}</p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
              value={prompt}
              type="text"
              placeholder="Enter the Prompt Here"
            />
            <div className="send-button">
              <button
                onClick={() => {
                  handleGenerateResponse(); // Call function correctly
                }}
              >
                Send
              </button>
            </div>
          </div>
          {/* <div className="bottom-info">
            <p>
              OverFlowAI may display inaccurate info, including about people, so
              double-check its responses. Your privacy & Stack Overflow Apps
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default GenerativeAIComponent;
