import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import bars from "../../assets/bars-solid.svg";
import logo from "../../assets/stlogo.png";
import Avatar from '../Avatar/Avatar';
import "./Navbar.css";
import { setcurrentuser } from '../../action/currentuser';
import { jwtDecode } from "jwt-decode";
import SearchIcon from "../../assets/search-solid.svg";

const Navbar = ({ handleslidein }) => {
  const User = useSelector((state) => state.currentuserreducer);
  const usersList = useSelector((state) => state.usersreducer); // Fetching all users from state
  const questions = useSelector((state) => state.questionreducer);
  const questionlist = questions.data;

  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [showsearch, setshowsearch] = useState(false);
  
  const searchRef = useRef(null); // To track the search bar and dropdown
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handlelogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate('/');
    dispatch(setcurrentuser(null));
  };

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedtoken = jwtDecode(token);
      if (decodedtoken.exp * 1000 < new Date().getTime()) {
        handlelogout();
      }
    }
    dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
  }, [User?.token, User?.result?.name, dispatch]);

  useEffect(() => {
    if (searchInput.trim() !== "") {
      // Filter users and questions
      const filteredUsers = usersList.filter(user =>
        user.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      const filteredQuestions = questionlist.filter(question =>
        question.questiontitle.toLowerCase().includes(searchInput.toLowerCase())
      );

      // Combine the results from both users and questions
      setFilteredResults([ ...filteredUsers, ...filteredQuestions ]);
    } else {
      setFilteredResults([]);
    }
  }, [searchInput, usersList, questionlist]);

  // Log filteredResults separately to see the updated state
  // useEffect(() => {
  //   // console.log(filteredResults);
  // }, [filteredResults]);

  // Handle search input and filter users
  const handleSearchChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    
    if (input.trim() !== "") {
      const filteredUsers = usersList.filter(user => 
        user.name.toLowerCase().includes(input.toLowerCase())
      );
      const filteredQuestions = questionlist.filter(question => 
        question.questiontitle.toLowerCase().includes(input.toLowerCase())
      );

      setFilteredResults([ ...filteredUsers, ...filteredQuestions ]);
    } else {
      setFilteredResults([]);
    }
  };

  // Handle click on search result and close the dropdown
  const handleUserClick = () => {
    setSearchInput('');  // Clear the search input
    setFilteredResults([]); // Hide the dropdown
    setshowsearch(false);
  };

  // Close dropdown when clicking outside of search bar and results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFilteredResults([]); // Close the dropdown
        setshowsearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  return (
    <nav className="main-nav">
      <div className="navbar">
        <button className="slide-in-icon" onClick={() => handleslidein()}>
          <img src={bars} alt="bars" width='15' />
        </button>
        <div className="navbar-1">
          <Link to='/' className='nav-item nav-logo'>
            <img src={logo} alt="Logo" />
          </Link>
          <Link to='/' className="nav-item nav-btn res-nav">
            About
          </Link>
          <Link to='/' className="nav-item nav-btn res-nav">
            Products
          </Link>
          <Link to='/overflowai' className="nav-item nav-btn res-nav">
            OverflowAI
          </Link>
          <div>
            <button className='searchbutton' onClick={() => setshowsearch(prev => !prev)}>
              <img src={SearchIcon} alt="search" width='18' className='search-icon' />
            </button>
          </div>
          {showsearch && (
            <div className="search-bar-container-mobile" ref={searchRef}>
              <form action="" className="search-form">
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleSearchChange}
                  placeholder="Search users or questions..."
                  className="search-input"
                />
                <img src={SearchIcon} alt="search" width='18' className='search-icon' />
              </form>
              {/* Show filtered results when input is not empty */}
              {filteredResults.length > 0 && (
                <ul className="search-results">
                  {filteredResults.map(item => (
                    <li key={item._id}>
                      {item.name ? (
                        // If item is a user
                        <Link
                          to={`/Users/${item._id}`}
                          onClick={() => handleUserClick()} // Close dropdown on click
                          className="search-result-item"
                        >
                           <div>
                          <span style={{fontWeight:'300',fontStyle:'italic'}}>User:</span>
                        <span className="user-name">{item.name}</span>
                        </div>
                          {/* Render user tags */}
                        <div className="user-tags">
                          {item.tags?.map((tag,index) => (
                            <span key={`${tag}-${index}`} className="tag-item">{tag}</span>
                          ))}
                        </div>
                        </Link>
                      ) : (
                        // If item is a question
                        <Link
                          to={`/Question/${item._id}`}
                          onClick={() => handleUserClick()} // Close dropdown on click
                          
                        >
                          <div className="search-result-item2">
                          <span style={{fontWeight:'300',fontStyle:'italic'}}>Question:</span>
                          <span className="question-title">{item.questiontitle}</span>
                          <p className="question-title" style={{fontWeight:'300'}}>{item.questionbody}</p>
                          </div>
                          
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <div className="search-bar-container" ref={searchRef}>
            <form action="" className="search-form">
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchChange}
                placeholder="Search users or questions..."
                className="search-input"
              />
              <img src={SearchIcon} alt="search" width='18' className='search-icon' />
            </form>
            {/* Show filtered results when input is not empty */}
            {filteredResults.length > 0 && (
              <ul className="search-results">
                {filteredResults.map(item => (
                  <li key={item._id}>
                    {item.name ? (
                      // If item is a user
                      <Link
                        to={`/Users/${item._id}`}
                        onClick={() => handleUserClick()} // Close dropdown on click
                        className="search-result-item"
                      >
                        
                        <div>
                          <span style={{fontWeight:'300',fontStyle:'italic'}}>User:</span>
                        <span className="user-name">{item.name}</span>
                        </div>
                        {/* Render user tags */}
                        <div className="user-tags">
                          {item.tags?.map((tag,index) => (
                            <span key={`${tag}-${index}`} className="tag-item">{tag}</span>
                          ))}
                        </div>
                      </Link>
                    ) : (
                      // If item is a question
                      <Link
                        to={`/Question/${item._id}`}
                        onClick={() => handleUserClick()} // Close dropdown on click
                        
                        
                      >
                        
                        <div className="search-result-item2">
                        <span style={{fontWeight:'300',fontStyle:'italic'}}>Question:</span>
                        <span className="question-title" >{item.questiontitle}</span>
                        <p className="question-title" style={{fontWeight:'300'}}>{item.questionbody}</p>
                        </div>
                        
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="navbar-2">
          {User === null || User === undefined ? (
            <Link to="/Auth" className='nav-item nav-links'>
              Log in
            </Link>
          ) : (
            <>
              <div style={{ marginRight: '20px', display: 'flex', flexDirection: 'row', gap: "10px" }}>
                <Avatar backgroundColor='#009dff' px='10px' py='7px' borderRadius='50%' color='white'>
                  <Link to={`/Users/${User?.result?._id}`} style={{ color: 'white', textDecoration: 'none' }}>
                    {User.result?.name?.charAt(0).toUpperCase()}
                  </Link>
                </Avatar>
                <button className='nav-item nav-links' onClick={handlelogout}>Log Out</button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
