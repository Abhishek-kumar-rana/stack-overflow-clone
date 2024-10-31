import React, { useEffect, useState } from 'react';
import moment from 'moment';
import copy from "copy-to-clipboard";
import upvote from "../../../assets/sort-up.svg";
import downvote from "../../../assets/sort-down.svg";
import './Question.css';
import Displayanswer from './Displayanswer';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import Avatar from '../../Avatar/Avatar';
import { deletequestion, votequestion, postanswer, fetchallquestion } from '../../../action/question';

const Qustiondetails = () => {
    const [answer, setAnswer] = useState("");
    const [isVoting, setIsVoting] = useState(false);
    const dispatch = useDispatch();
    const questionlist = useSelector((state) => state.questionreducer);
    const { id } = useParams();
    const user = useSelector((state) => state.currentuserreducer);
    const location = useLocation();
    const navigate = useNavigate();
    const url = "https://localhost:5173";

    const handlePostAnswer = (e, answerLength) => {
        e.preventDefault();
        if (!user) {
            alert("Login or Signup to answer a question");
            navigate('/Auth');
        } else if (!answer) {
            alert("Enter an answer before submitting");
        } else {
            dispatch(postanswer({
                id,
                noofanswers: answerLength + 1,
                answerbody: answer,
                useranswered: user.result.name
            }));
            setAnswer("");
        }
    };

    const handleShare = () => {
        copy(url + location.pathname);
        alert("Copied url: " + url + location.pathname);
    };

    const handleDelete = () => {
        dispatch(deletequestion(id, navigate));
    };

    const handleVote = (type) => {
        if (!user) {
            alert("Login or Signup to vote on a question");
            navigate('/Auth');
        } else if (!isVoting) {
            setIsVoting(true);
            dispatch(votequestion(id, type)).finally(() => setIsVoting(false));
        }
    };

    useEffect(() => {
        if (!questionlist?.data) {
            dispatch(fetchallquestion());
        }
    }, [dispatch, questionlist?.data]);

    const currentQuestion = questionlist?.data?.find((question) => question._id === id);

    return (
        <div className="question-details-page">
            {!currentQuestion ? (
                <>
                <h1>No Questions Available</h1>
                <div>
                    <div className="skeleton-title skeleton"></div>
                    <div className='main-skeleton'>
                        <div className="skeleton-vote">
                            <div className="line circle skeleton"></div>
                            <div className="line skeleton"></div>
                            <div className="line circle skeleton"></div>
                        </div>
                        <div className="skeleton-main skeleton"></div>
                        <div className="skeleton-time">
                            <div className='line skeleton'></div>
                            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                <div className="circle skeleton"></div>
                                <div className="name skeleton"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                </>
                
            ) : (
                <>
                    <div key={currentQuestion._id}>
                        <section className='question-details-container'>
                            <h1>{currentQuestion.questiontitle}</h1>
                            <div className="question-details-container-2">
                                <div className="question-votes">
                                    <img src={upvote} alt="Upvote" width={18} className='votes-icon' onClick={() => handleVote("upvote")} />
                                    <p>{currentQuestion.upvote.length - currentQuestion.downvote.length}</p>
                                    <img src={downvote} alt="Downvote" width={18} className='votes-icon' onClick={() => handleVote("downvote")} />
                                </div>
                                <div style={{ width: "100%" }}>
                                    <p className='question-body'>{currentQuestion.questionbody}</p>
                                    <div className="question-details-tags">
                                        {currentQuestion.questiontags.map((tag) => (
                                            <p key={tag}>{tag}</p>
                                        ))}
                                    </div>
                                    <div className="question-actions-user">
                                        <div>
                                            <button type='button' onClick={handleShare}>Share</button>
                                            {user?.result?._id === currentQuestion?.userid && (
                                                <button type='button' onClick={handleDelete}>Delete</button>
                                            )}
                                        </div>
                                        <div>
                                            <p>Asked {moment(currentQuestion.askedon).fromNow()}</p>
                                            <div style={{ display: 'flex', gap: "10px", alignItems: 'center' }}>
                                                <Avatar backgroundColor='gold' px='10px' py='7px' borderRadius='50%' color='white'>
                                                    <Link to={`Users/${currentQuestion.userid}`} style={{ color: 'white', textDecoration: 'none' }}>
                                                        {currentQuestion.userposted.charAt(0).toUpperCase()}
                                                    </Link>
                                                </Avatar>
                                                <div>{currentQuestion.userposted}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {currentQuestion.noofanswers !== 0 && (
                            <section>
                                <h3>{currentQuestion.noofanswers} Answers</h3>
                                <Displayanswer question={currentQuestion} handleShare={handleShare} />
                            </section>
                        )}
                        <section className="post-ans-container">
                            <h3>Your Answer</h3>
                            <form onSubmit={(e) => handlePostAnswer(e, currentQuestion.answer.length)}>
                                <textarea cols="30" rows="10" value={answer} onChange={(e) => setAnswer(e.target.value)}></textarea>
                                <br />
                                <input type="submit" className="post-ans-btn" value="Post your Answer" />
                            </form>
                            <p>Browse other questions tagged
                                {currentQuestion.questiontags.map((tag) => (
                                    <Link to="/Tags" key={tag} className='ans-tag'> {tag} </Link>
                                ))} or
                                <Link to="/Askquestion" style={{ textDecoration: "none", color: "#009dff" }}> Ask your own question</Link>
                            </p>
                        </section>
                    </div>
                </>
            )}
        </div>
    );
};

export default Qustiondetails;
