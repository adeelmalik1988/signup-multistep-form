import React from 'react';
import Home from './pages/Home'
import MainAppBar from './components/Appbar'
import {
  BrowserRouter as Router, Route, Routes, Link


} from 'react-router-dom'

import SubmissionComplete from './pages/SubmissionComplete';
import MultistepForm from './components/multistepform/MultistepForm';
import { Grid } from '@material-ui/core';
import './App.css'


function App() {
  return (
    <div className='App' >
      <Router>
        <MainAppBar />
      
        <br />
        <Grid container  style={{
          padding:'1em',
          margin: 'auto'
        }} >
          <Grid item >
          <nav>
            <Link to='/' >
              Home
          </Link>
          </nav>
          </Grid>
        </Grid>

        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/submitted' element={<SubmissionComplete />} ></Route>
          <Route path='/signup' element={<MultistepForm />} ></Route>
        </Routes>


      </Router>



    </div>
  );
}

export default App;
