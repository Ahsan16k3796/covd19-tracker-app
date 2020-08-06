import React from 'react';
import './App.css';
import covid19 from './images/covid19.jpg';

//Importing components

import Header from './components/Header';
import MainGrid from './components/MainGrid';

function App() {
  return (
    <div styles={{ backgroundImage:`url(${covid19})`}} className='container'>
      <Header/>
      <MainGrid/>
    </div>
        
     );
}

export default App;
