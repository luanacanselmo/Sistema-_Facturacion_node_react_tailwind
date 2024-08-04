import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Cliente from './components/cliente';
import Factura from './components/Factura';
import Productos from './components/Productos';
import ProducList from './components/ProducList';
import Inicio from './components/Inicio';
import ClienteList from './components/ClienteList';
import Facturapdf from './components/Facturapdf';
import FacturaList from './components/FacturaList';

function App() {
 

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/" element={<Inicio />} />
          <Route path="/cliente" element={<Cliente />} />
          <Route path="/Productos" element={<Productos />} />
          <Route path="/factura" element={<Factura />} />
          <Route path="/produclist" element={<ProducList />} />
          <Route path="/clienteslist" element={<ClienteList />} />
          <Route path="/Facturapdf" element={<Facturapdf />} />
          <Route path="/facturaList" element={<FacturaList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
