import API_BASE_URL from '../config/config'; // Path del los Endpoints
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDateTime } from '../utils/formatDateTime';
import { MascotaContext } from '../context/MascotaContext';
import { useContext } from 'react';

const ConsultasMascota = () => {
  const { idMascota, paciente, idFamilia } = useParams();
  const [consultas, setConsultas] = useState([]);
  const nombre = decodeURIComponent(paciente);

  const { setMascotaActual } = useContext(MascotaContext);
  useEffect(() => {
    setMascotaActual(nombre);
  }, [nombre, setMascotaActual]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/consultas/mascota/${idMascota}`)
      .then(res => res.json())
      .then(data => setConsultas(data))
      .catch(err => console.error('Error al cargar consultas:', err));
  }, [idMascota]);

  return (
    <div>
      <h2>Paciente: {nombre}</h2>
      <div className="d-flex gap-3 my-4">
        <Link to={idFamilia ? `/familias/${idFamilia}/mascotas` : '/'} className="btn btn-sm btn-warning" style={{ width: '150px' }}>
          Volver
        </Link>
        <Link to={`/consultas/${idMascota}/detalle`} className="btn btn-sm btn-primary" style={{ width: '150px' }}>
          Agregar Consulta
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Motivo</th>
            <th>Notas</th>
            <th>Fecha</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(consultas) && consultas.length > 0 ? (
            consultas.map((c) => (
              <tr key={c.id}>
                <td>{c.motivo}</td>
                <td>{c.notas}</td>
                <td>{formatDateTime(c.fecha_creacion)}</td>
                <td>
                  <Link to={`/consultas/${idMascota}/detalle/${c.id}`} className="btn btn-sm btn-success">Ver</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No hay consultas registradas</td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
};

export default ConsultasMascota;
