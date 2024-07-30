// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cliente from './components/cliente';
import Factura from './components/Factura';
import Productos from './components/Productos';
import ProducList from './components/ProducList';
import Inicio from './components/Inicio';
// import Calendar from './components/Calendar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
        <Route path="/" element={<Inicio />} />
          <Route path="/cliente" element={<Cliente />} />
          <Route path="/Productos" element={<Productos />} />
          <Route path="/factura" element={<Factura />} />
          <Route path="/produclist" element={<ProducList />} />
        
        </Routes>
      </div>
    
    </Router>
  );
}

export default App;
