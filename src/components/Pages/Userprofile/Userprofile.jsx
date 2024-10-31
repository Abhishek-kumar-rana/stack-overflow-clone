import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import Editprofileform from './Editprofileform'
import Profilebio from './Profilebio'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons'
import Leftsidebar from '../../Leftsidebar/Leftsidebar'
import { initializePushNotifications, setupMessageListener } from '../Auth/PushNotification'
import { TransferPoints, updatenotification } from '../../../action/users'
import { FaSpinner, FaBell, FaBellSlash } from 'react-icons/fa';
import LoginHistory from './LogonHistory'
import TransferPointsModal from './TransferPointsModal.jsx'

import './Userprofile.css'

const Userprofile = ({ slidein }) => {
  const dispatch = useDispatch();
  const { id } = useParams()
  const [Switch, setswitch] = useState(false);
  const [loading, setloading] = useState(false); // Track loading state
  
  const users = useSelector((state) => state.usersreducer)
  const currentprofile = users.filter((user) => user._id === id)[0]
  const currentuser = useSelector((state) => state.currentuserreducer)

  const [notificationsEnabled, setnotificationsEnabled] = useState(false);
  const [fcmtoken, setfcmtoken] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePoints, setProfilePoints] = useState(0); 
  const [userPoints,setUserPoints]=useState(currentuser?.result?.points);

   useEffect(()=>{
      if(currentprofile){
         setProfilePoints(currentprofile?.points)
      }
   },[currentprofile])

   useEffect(()=>{
    if(currentuser && currentprofile) {
      const user = users.filter((user) => user._id === currentuser?.result?._id)[0];
      setUserPoints(user.points)

    }
   },[currentuser,currentprofile])



  useEffect(() => {
    const fetchUser = async () => {
      try {
        if(currentuser){
          setnotificationsEnabled(currentuser?.result?.notificationsEnabled);
          setfcmtoken(currentuser.result.fcmtoken);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUser();
  },[currentuser]);
  
  const fetchToken = async () => {
    try {
      const { token, notificationsEnabled } = await initializePushNotifications();
      if (token) {
        setfcmtoken(token);
        console.log('Token obtained:', token);
      }
    } catch (error) {
      console.error('Error fetching FCM token:', error);
    }
  }; 

  const handleToggle = async () => {
    setloading(true); // Start loading when clicked
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      alert("Please allow notification!");
      setloading(false);
      return;
    }
    
    try {
      if (!notificationsEnabled && !fcmtoken) {
        await fetchToken();
        setupMessageListener();
      }

      dispatch(updatenotification(currentuser?.result?._id, { notificationsEnabled: !notificationsEnabled, fcmtoken }));
      setnotificationsEnabled(prevState => !prevState);
    } catch (error) {
      console.error("Error updating notification settings", error);
    } finally {
      setloading(false); // Stop loading after completion
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleConfirmTransfer = (amount) => {
    const transferAmount = parseInt(amount, 10);
    if (transferAmount > 0 && transferAmount <= userPoints) {
      setUserPoints(prevPoints => prevPoints - transferAmount);
      const senderId = currentuser?.result?._id;
      const recipientId = id;
      const userdata = { senderId, recipientId, amount };
      dispatch(TransferPoints(userdata));
    } else {
      alert("Invalid transfer amount!");
    }
    toggleModal(); // Close modal after confirming
  };

  return (
    <div className="home-container-1">
      <Leftsidebar slidein={slidein} />
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <div className="avatar">
                {currentprofile?.name.charAt(0).toUpperCase()}
              </div>
              <div className="user-name">
                <h1>{currentprofile?.name}</h1>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} /> Joined {moment(currentprofile?.joinedon).fromNow()}
                </p>
                <p>Points: {profilePoints}</p>
              </div>
            </div>
            {currentuser?.result?._id === id && (
              <div className='profile-button'>
                <button onClick={handleToggle} className='edit-profile-btn' disabled={loading}>
                  {loading ? (
                    <FaSpinner className="spinner" /> 
                  ) : (
                    notificationsEnabled ? <FaBell /> : <FaBellSlash />
                  )} Notification 
                </button>

                <button className="edit-profile-btn" type='button' onClick={() => setswitch(true)}>
                  <FontAwesomeIcon icon={faPen} /> Edit Profile
                </button>
              </div>
            )}
            {currentuser?.result?._id !== id && currentuser && (
              <>
                <button onClick={toggleModal} className="transfer-btn">
                  Transfer Points
                </button>
                {isModalOpen && <TransferPointsModal
                                  isOpen={isModalOpen}
                                  toggleModal={toggleModal}
                                  onConfirm={handleConfirmTransfer}
                                  availablePoints={userPoints}
                                  username={currentprofile?.name}
                />}
              </>
            )}
          </div>
          <>
            {Switch ? (
              <Editprofileform currentuser={currentuser} setswitch={setswitch} />
            ) : (
              <div className='bio-history'>
                <div className='probio'>
                  <Profilebio currentprofile={currentprofile} />
                </div>
                {currentuser?.result?._id === id && (
                  <div className='history-container'>
                    <p>Login History</p>
                    <div className='loginhistory'>
                      <LoginHistory history={currentuser.result.loginHistory} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        </section>
      </div>
    </div>
  )
}

export default Userprofile;
