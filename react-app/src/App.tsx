import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react'
import HomeView from './routes/home/HomeView'
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Route exact path ='/' component={HomeView} />
    </BrowserRouter>
  );
}

export default App;
