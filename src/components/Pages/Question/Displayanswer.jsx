import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteanswer, voteanswer } from '../../../action/question';
import Avatar from '../../Avatar/Avatar';

import upvote from "../../../assets/sort-up.svg";
import downvote from "../../../assets/sort-down.svg";
import './Answer.css';

const Displayanswer = ({ question, handleshare }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isvoting, setisvoting] = useState(false);
  const [user, setuser] = useState(null);

  // Fetch user from Redux state
  const currentUser = useSelector((state) => state.currentuserreducer);

  // Set user once currentUser is available
  useEffect(() => {
    if (currentUser) {
      setuser(currentUser);
    }
  }, [currentUser]);

  // Voting user ID
  const votterid = user?.result?._id;

  const handledelete = (answerid, noofanswers) => {
    dispatch(deleteanswer(id, answerid, noofanswers - 1));
  };

  const handleupvote = (answerid, userid) => {
    if (user === null) {
      alert("Login or Signup to answer a question");
      navigate('/Auth');
    } else {
      if (!isvoting) {
        setisvoting(true);
        dispatch(voteanswer(id, "upvote", userid, answerid, votterid))
          .finally(() => setisvoting(false));
      }
    }
  };

  const handledownvote = (answerid, userid) => {
    if (user === null) {
      alert("Login or Signup to answer a question");
      navigate('/Auth');
    } else {
      if (!isvoting) {
        setisvoting(true);
        dispatch(voteanswer(id, "downvote", userid, answerid, votterid))
          .finally(() => setisvoting(false));
      }
    }
  };

  return (
    <div>
      {question.answer.map((ans) => (
        <div className="question-details-container-2" key={ans._id}>
          <div className="question-votes">
            <img
              src={upvote}
              alt=""
              width={18}
              className='votes-icon'
              onClick={() => handleupvote(ans._id, ans.userid)}
            />
            <p>{ans.upvote.length - ans.downvote.length}</p>
            <img
              src={downvote}
              alt=""
              width={18}
              className='votes-icon'
              onClick={() => handledownvote(ans._id, ans.userid)}
            />
          </div>
          <div className="display-ans" style={{ width: '100%' }}>
            <p>{ans.answerbody}</p>
            <div className="question-actions-user">
              <div>
                <button type='button' onClick={handleshare}>Share</button>
                {user?.result?._id === ans?.userid && (
                  <button type='button' onClick={() => handledelete(ans._id, question.noofanswers)}>Delete</button>
                )}
              </div>
              <div>
                <p>answered {moment(ans.answeredon).fromNow()}</p>
                <div style={{ marginRight: '20px', display: 'flex', flexDirection: 'row', gap: "10px", alignItems: 'center' }}>
                  <Avatar backgroundColor='lightgreen' px='10px' py='7px' borderRadius='50%' color='white'>
                    <Link to={`Users/${ans.userid}`} style={{ color: 'white', textDecoration: 'none' }}>
                      {ans.useranswered.charAt(0).toUpperCase()}
                    </Link>
                  </Avatar>
                  <div>{ans.useranswered}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Displayanswer;
