import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Allroutes from './Allroutes';
import { fetchallusers } from './action/users';
import { useDispatch } from 'react-redux';


function App() {
  const [slidein, setslidein] = useState(true);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchallusers());
  },[dispatch])
  useEffect(()=>{
    if(window.innerWidth<=768){
      setslidein(false);
    }
  },[])
  const handleslidein=()=>{
    if(window.innerWidth<=768){
      setslidein((state)=>!state);
    }
  }

  return (
    <div className='main-box'>
    <Router>
      
        <Navbar handleslidein={handleslidein}/>
        <Allroutes slidein={slidein} handleslidein={handleslidein}/>
    </Router></div>
  )
}

export default App
