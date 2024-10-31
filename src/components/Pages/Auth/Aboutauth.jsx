import React from 'react'
import icon from '../../../assets/icon.png'
import { BsQuestionSquareFill } from "react-icons/bs";
import { BiSolidCommentCheck } from "react-icons/bi";
import { IoPricetags } from "react-icons/io5";
import { AiFillTrophy } from "react-icons/ai";
const Aboutauth = () => {
  return (
    <div className="auth-container-1">
      
      <div className='title'>
      <img src={icon} alt="icon" className='login-logo1' />
      <span>stack<span className='over'>overflow</span></span>
      </div>
      <h4>Join the Stack Overflow community</h4>
      <p>
        <BsQuestionSquareFill  className='paragraph-icon' />
        Get unstuck — ask a question
      </p>
      <p>
        <BiSolidCommentCheck className='paragraph-icon' />
        Unlock new privileges like voting and commenting
      </p>
      <p>
        <IoPricetags className='paragraph-icon' />
        Save your favorite tags, filters, and jobs
      </p>
      <p>
        <AiFillTrophy className='paragraph-icon' />
        Earn reputation and badges
      </p>
      <p className='responsive-text' style={{ fontSize: "13px", color: "#666767" }}>
        Collaborate and share knowledge with a private group for
      </p>
      <p className='responsive-text' style={{ fontSize: "13px", color: "#007ac6" }}>
        Get Stack Overflow for Teams free for up to 50 users.
      </p>
    </div>
  )
}

export default Aboutauth