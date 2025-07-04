import API_BASE_URL from '../config/config'; // Path del los Endpoints
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { MascotaContext } from '../context/MascotaContext';

function ConsultaDetalle() {
  const { idMascota, idConsulta } = useParams();
  const esNueva = !idConsulta;
  const navigate = useNavigate();
  const { mascotaActual } = useContext(MascotaContext);

  const [form, setForm] = useState({
    motivo: '',
    notas: ''
  });

  useEffect(() => {
    if (!esNueva) {
      fetch(`${API_BASE_URL}/consultas/${idConsulta}`)
        .then(res => res.json())
        .then(data => setForm({ motivo: data.motivo, notas: data.notas }))
        .catch(err => console.error(err));
    }
  }, [idConsulta, esNueva]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = esNueva
      ? `${API_BASE_URL}/consultas`
      : `${API_BASE_URL}/consultas/${idConsulta}`;

    const method = esNueva ? 'POST' : 'PUT';
    const body = esNueva ? { id_mascota: parseInt(idMascota), ...form } :
      { id_mascota: parseInt(idMascota), ...form };

    // Boton Guardar (Sirve para NUEVA o EDITAR)
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al guardar consulta');
        return res.json();
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Consulta guardada',
          text: 'Registro agregado correctamente',
          timer: 5000,
          timerProgressBar: true,
          confirmButtonText: 'Aceptar'
        }).then(() => {
          navigate(`/consultas/${idMascota}/${mascotaActual}`);
        });
      })
      .catch(err => {
        console.error('Error al guardar:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo guardar la consulta'
        });
      });
  };

  // Boton Eliminar
  const handleEliminar = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la consulta de forma permanente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_BASE_URL}/consultas/${idConsulta}`, {
          method: 'DELETE'
        })
          .then(res => {
            if (!res.ok) throw new Error('Error al eliminar');
            return res.json();
          })
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Consulta eliminada',
              text: 'La consulta ha sido eliminada correctamente',
              timer: 3000,
              showConfirmButton: false
            });
            navigate(`/consultas/${idMascota}/${mascotaActual}`);
          })
          .catch(err => {
            console.error('Error al eliminar:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar la consulta'
            });
          });
      }
    });
  };

  // Botón Cancelar
  const handleCancelar = () => {
    Swal.fire({
      title: '¿Cancelar cambios?',
      text: 'Si cancelas, se perderán los datos no guardados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Seguir editando',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/familias');
      }
    });
  };

  return (
    <div className="container">
      <h2 className="my-3">{esNueva ? `Nueva Consulta: ${mascotaActual}` : `Detalle de Consulta: ${mascotaActual}`}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Motivo</label>
          <input
            className="form-control"
            value={form.motivo}
            onChange={(e) => setForm({ ...form, motivo: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Notas</label>
          <textarea
            className="form-control"
            value={form.notas}
            onChange={(e) => setForm({ ...form, notas: e.target.value })}
            required
          />
        </div>

        <div className="d-flex justify-content-between mt-4">
          {/* Botones Guardar y Cancelar agrupados */}
          <div>
            <button className="btn btn-warning me-2" type="button" onClick={handleCancelar}>
              Volver
            </button>
            <button className="btn btn-success me-2" type="submit">
              Guardar
            </button>
          </div>

          {/* Botón Eliminar separado */}
          {!esNueva && (
            <button className="btn btn-danger" type="button" onClick={handleEliminar}>
              Eliminar
            </button>
          )}
        </div>

      </form>
    </div>
  );
}

export default ConsultaDetalle;
