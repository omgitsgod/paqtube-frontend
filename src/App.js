import React from 'react';
import './App.css';
import Banner from './components/Banner'
import CardContainer from './components/CardContainer'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Banner />
        <CardContainer />
      </header>
    </div>
  );
}

export default App;
