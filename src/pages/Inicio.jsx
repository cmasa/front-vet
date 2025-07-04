import API_BASE_URL from '../config/config'; // Path del los Endpoints
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
  const [mascotas, setMascotas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [textoInput, setTextoInput] = useState('');

  const obtenerMascotas = async (nombre = '') => {
    try {
      const endpoint = nombre
        ? `${API_BASE_URL}/mascotas/buscar/${nombre}`
        : `${API_BASE_URL}/mascotas`;
      const response = await fetch(endpoint);
      const data = await response.json();
      setMascotas(data);
    } catch (error) {
      console.error('Error al obtener mascotas:', error);
    }
  };

  useEffect(() => {
    obtenerMascotas(); // carga inicial
  }, []);

  const handleBuscar = (e) => {
    e.preventDefault(); // evita recarga del form
    setBusqueda(textoInput);
    obtenerMascotas(textoInput);
  };

  return (
    <div>
      <h2>Pacientes registrados</h2>

      <form onSubmit={handleBuscar}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre o apellido de la Familia, o nombre de la Mascota"
            value={textoInput}
            onChange={(e) => setTextoInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Buscar
          </button>
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Familia</th>
            <th>Nombre</th>
            <th>Especie</th>
            <th>Raza</th>
            <th>Consultas</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map((m) => (
            <tr key={m.id}>
              <td>{m.apellido}, {m.nombre}</td>
              <td>{m.paciente}</td>
              <td>{m.especie}</td>
              <td>{m.raza}</td>
              <td><Link to={`/consultas/${m.id}/${encodeURIComponent(m.paciente)}`} className="btn btn-sm btn-outline-primary">
                  Ver Consultas
                  </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inicio;
