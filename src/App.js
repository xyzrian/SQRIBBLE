import React from 'react'
import { useEffect, useState, createContext } from "react";
import Navbar from './components/Navbar';
import Canvas from './components/Canvas'
import {Providers} from './Providers';

export default function App() {

  // const ColourContext1 = createContext('rgba(57, 82, 212, 1)')
  // const ColourContext2 = createContext('rgba(236, 238, 249, 1)')

  // const [brushSize, setBrushSize] = useState('25')

  return (

    <Providers>
      <div className="App">
          <Navbar />
          <Canvas />
      </div>
    </Providers>
  );
}