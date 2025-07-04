import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Inicio from './pages/Inicio.jsx';
import Familias from './pages/Familias.jsx';
import ConsultasMascota from './components/ConsultasMascota.jsx';
import ConsultaDetalle from './components/ConsultaDetalle.jsx';
import FamiliaDetalle from './components/FamiliaDetalle.jsx';
import MascotasPorFamilia from './components/MascotasPorFamilia.jsx';
import MascotaDetalle from './components/MascotaDetalle.jsx';

const Mascotas = () => <h2>Listado de Mascotas</h2>;

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/familias" element={<Familias />} />
          <Route path="/mascotas" element={<Mascotas />} />
          <Route path="/consultas/:idMascota/:paciente" element={<ConsultasMascota />} />
          <Route path="/consultas/:idMascota/:paciente/:idFamilia" element={<ConsultasMascota />} />
          <Route path="/consultas/:idMascota/detalle" element={<ConsultaDetalle />} />
          <Route path="/consultas/:idMascota/detalle/:idConsulta" element={<ConsultaDetalle />} />
          <Route path="/familias/detalle" element={<FamiliaDetalle />} />
          <Route path="/familias/detalle/:idFamilia" element={<FamiliaDetalle />} />
          <Route path="/familias/:idFamilia/mascotas" element={<MascotasPorFamilia />} />
          <Route path="/familias/:idFamilia/mascotas/detalle" element={<MascotaDetalle />} />
          <Route path="/familias/:idFamilia/mascotas/detalle/:idMascota" element={<MascotaDetalle />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
