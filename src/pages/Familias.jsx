import API_BASE_URL from '../config/config'; // Path del los Endpoints
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Familias = () => {
  const [familias, setFamilias] = useState([]);
  const [textoInput, setTextoInput] = useState('');

  const obtenerFamilias = async (nombre = '') => {
    try {
      const endpoint = nombre
        ? `${API_BASE_URL}/familias/buscar/${nombre}`
        : `${API_BASE_URL}/familias`;
      const response = await fetch(endpoint);
      const data = await response.json();
      setFamilias(data);
    } catch (error) {
      console.error('Error al obtener familias:', error);
    }
  };

  useEffect(() => {
    obtenerFamilias(); // carga inicial
  }, []);

  const handleBuscar = (e) => {
    e.preventDefault(); // evita recarga del form
    obtenerFamilias(textoInput);
  };

  return (
    <div>
      <h2>Familias registradas</h2>
      <div className="d-flex gap-3 my-4">
        <Link to={`/`} className="btn btn-sm btn-warning" style={{ width: '150px' }}>
          Volver
        </Link>
        <Link to={`/familias/detalle`} className="btn btn-sm btn-primary" style={{ width: '150px' }}>
          Agregar Familia
        </Link>
      </div>
      <form onSubmit={handleBuscar}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre o apellido de la Familia"
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
            <th>Apellido</th>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>e-Mail</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {familias.map((m) => (
            <tr key={m.id}>
              <td>{m.apellido}</td>
              <td>{m.nombre}</td>
              <td>{m.telefono}</td>
              <td>{m.email}</td>
              <td>
                <Link to={`/familias/detalle/${m.id}`} className="btn btn-sm btn-outline-primary me-1">
                  Detalles
                </Link>
                <Link to={`/familias/${m.id}/mascotas`} className="btn btn-sm btn-outline-success">
                  Mascotas
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Familias;
