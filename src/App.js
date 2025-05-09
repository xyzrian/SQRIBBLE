import React from 'react'
import Navbar from './components/Navbar';
import Canvas from './components/Canvas'
import {Providers} from './Providers';

export default function App() {

  return (

    <Providers>
      <div className="App">
          <Navbar />
          <Canvas />
      </div>
    </Providers>
  );
}