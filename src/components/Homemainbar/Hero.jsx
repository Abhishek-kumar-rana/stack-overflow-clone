import React from 'react'
import homehero from "../../assets/home-hero.png"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "./Hero.css"
const Hero = () => {
  var User = useSelector((state)=>state.currentuserreducer);

  return (
    <>
    <div className='main-hero'>
        <div className='left-hero'>
        <p className='heading'>Every <span>developer</span> has a tab open to Stack Overflow.</p>
        <h4 className='history'>For over 15 years we’ve been the Q&A platform of choice that millions of people visit every month to ask questions, learn, and share technical knowledge.</h4>
        <div className="hero-login"  style={{margin:"0px"}}>
          {User===null||User===undefined?(
            <Link to="/Auth" className='loginbutton'>
            Log in</Link>
          ):(<p></p>)}
          <p style={{padding:"10px", color:"#155Ca2"}}>Visit the community... </p>
          </div>
        </div>
        <div className='right-hero'>
            <img className='hero-img' src={homehero} alt="Wellcom" />
        </div>
    </div>
    </>
  )
}

export default Hero

{/* <div className="hero-login"  style={{margin:"0px"}}>
          <div>
          {User===null||User===undefined?(
            <Link to="/Auth" className='loginbutton'>
            Log in</Link>
          ):(<p></p>)}
          </div>
          <div>
          <p style={{padding:"10px", color:"#155Ca2"}}>Visit the community... </p>
          </div>
          </div> */}