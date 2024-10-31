import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Pages/Home/Home'
import Askquestion from './components/Pages/Askquestion/Askquestion'
import Auth from './components/Pages/Auth/Auth'
import Question from './components/Pages/Question/Question'
import Displayquestion from './components/Pages/Question/Displayquestion'
import Tags from './components/Pages/Tags/Tags'
import Users from './components/Pages/Users/Users'
import Userprofile from './components/Pages/Userprofile/Userprofile'
import Overflowai from './components/Pages/Overflowai/Overflowai'
import Recovery from './components/Pages/Recovery/Recovery'
import AccountRecovery from './components/Pages/Recovery/AccountRecovery'

function Allroutes({slidein,handleslidein}) {
  return (
    <Routes basename='/'>
        <Route path='/' element={<Home slidein={slidein} handleslidein={handleslidein} />}></Route>
        <Route path='*' element={<Home slidein={slidein} handleslidein={handleslidein} />}></Route>
        <Route path='/Askquestion' element={<Askquestion />}></Route>
        <Route path='/Auth' element={<Auth/>}></Route>
        <Route path='/Auth/Recovery' element={<AccountRecovery/>}></Route>
        <Route path='/Question' element={<Question slidein={slidein} handleslidein={handleslidein}/>}></Route>
        <Route path='/Question/:id' element={<Displayquestion slidein={slidein} handleslidein={handleslidein}/>}></Route>
        <Route path='/Tags' element={<Tags slidein={slidein} handleslidein={handleslidein}/>}></Route>
        <Route path='/Users' element={<Users slidein={slidein} handleslidein={handleslidein}/>}></Route>
        <Route path='/Users/:id' element={<Userprofile slidein={slidein} handleslidein={handleslidein}/>}></Route>
        <Route path='/overflowai' element={<Overflowai slidein={slidein} handleslidein={handleslidein}/>}></Route>


    </Routes>
  )
}

export default Allroutes