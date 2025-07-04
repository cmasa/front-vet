import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import API_BASE_URL from '../config/config';

function FamiliaDetalle() {
    const { idFamilia } = useParams();
    const esNueva = !idFamilia;
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        direccion: '',
        email: ''
    });

    const [errores, setErrores] = useState([]);

    useEffect(() => {
        if (!esNueva) {
            fetch(`${API_BASE_URL}/familias/${idFamilia}`)
                .then(res => res.json())
                .then(data => setForm(data))
                .catch(err => console.error('Error al cargar familia:', err));
        }
    }, [idFamilia, esNueva]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrores([]); // Limpia errores previos

        const url = esNueva
            ? `${API_BASE_URL}/familias`
            : `${API_BASE_URL}/familias/${idFamilia}`;

        const method = esNueva ? 'POST' : 'PUT';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                if (response.status === 400) {
                    const data = await response.json();
                    // Muestra errores validados (Directamente desde el HandleValidation)
                    if (data.errores) {
                        setErrores(data.errores);
                        return;
                    }
                }
                throw new Error('Error al guardar familia');
            }

            await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: esNueva ? 'Familia agregada correctamente' : 'Familia actualizada',
                timer: 4000,
                showConfirmButton: false
            }).then(() => {
                navigate('/familias');
            });

        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo guardar la familia'
            });
        }
    };

    // Boton Eliminar
    const handleEliminar = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará este registro de forma permanente. Tampoco se podrá acceder a los registros de sus mascostas.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${API_BASE_URL}/familias/${idFamilia}`, {
                    method: 'DELETE'
                })
                    .then(res => {
                        if (!res.ok) throw new Error('Error al eliminar');
                        return res.json();
                    })
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Registro eliminado',
                            text: 'Registro de Familia ha sido eliminado correctamente.',
                            timer: 3000,
                            showConfirmButton: false
                        });
                        navigate(`/familias`);
                    })
                    .catch(err => {
                        console.error('Error al eliminar:', err);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo eliminar el registro.'
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
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="card shadow p-4" style={{ width: '100%', maxWidth: '700px' }}>
                <h4 className="mb-4 text-center">{esNueva ? 'Agregar Familia' : 'Editar Familia'}</h4>

                {errores.length > 0 && (
                    <div className="alert alert-danger">
                        <ul className="mb-0">
                            {errores.map((error, i) => (
                                <li key={i}>{error.msg}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Nombre</label>
                            <input
                                className="form-control"
                                value={form.nombre}
                                maxLength={50}
                                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Apellido</label>
                            <input
                                className="form-control"
                                value={form.apellido}
                                maxLength={50}
                                onChange={(e) => setForm({ ...form, apellido: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Teléfono</label>
                            <input
                                className="form-control"
                                value={form.telefono}
                                maxLength={20}
                                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={form.email}
                                maxLength={100}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Dirección</label>
                        <input
                            className="form-control"
                            value={form.direccion}
                            maxLength={100}
                            onChange={(e) => setForm({ ...form, direccion: e.target.value })}
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
        </div>

    );
}

export default FamiliaDetalle;
