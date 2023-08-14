import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './screens/Dashboard';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SignUpForm from './screens/signup';
import SignInForm from './screens/login';


function App() {
  return (

    <DndProvider backend={HTML5Backend}>
    <Router>
  
  <Routes>
  
    <Route path='/home' element={<Dashboard/>}/>
    <Route path="/" element={<SignUpForm/>}/>
    <Route path="/login" element={<SignInForm/>}/>

  </Routes>
</Router>
    </DndProvider>
  )
}

export default App