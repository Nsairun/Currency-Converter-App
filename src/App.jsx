import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Converter from './Component/Converter/Converter';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Converter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
