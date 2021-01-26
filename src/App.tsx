import React from 'react';
import './App.css';
import { Listings } from './components/Listings.component';

function App() {
  return (
    <div className="App">
      <h1>Trending Products</h1>
      <Listings />
    </div>
  );
}

export default App;
