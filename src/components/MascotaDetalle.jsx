import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API_BASE_URL from '../config/config';
import Swal from 'sweetalert2';

function MascotaDetalle() {
    const { idFamilia, idMascota } = useParams();
    const esNueva = !idMascota;
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: '',
        especie: '',
        raza: '',
        edad: '',
        peso: ''
    });

    useEffect(() => {
        if (!esNueva) {
            fetch(`${API_BASE_URL}/mascotas/${idMascota}`)
                .then(res => res.json())
                .then(data => setForm(data))
                .catch(err => console.error(err));
        }
    }, [idMascota, esNueva]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = esNueva
            ? `${API_BASE_URL}/mascotas`
            : `${API_BASE_URL}/mascotas/${idMascota}`;

        const method = esNueva ? 'POST' : 'PUT';
        const body = esNueva
            ? { ...form, id_dueno: parseInt(idFamilia) }
            : { id: parseInt(idMascota), ...form };
        console.log(method, url, body);
        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then(res => {
                if (!res.ok) throw new Error('Error al guardar');
                return res.json();
            })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Mascota guardada',
                    text: 'Los datos fueron guardados correctamente',
                    timer: 3000,
                    showConfirmButton: false
                });
                navigate(`/familias/${idFamilia}/mascotas`);
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo guardar la mascota'
                });
            });
    };

    const handleEliminar = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará la mascota',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${API_BASE_URL}/mascotas/${idMascota}`, {
                    method: 'DELETE'
                })
                    .then(() => {
                        Swal.fire('Eliminado', 'La mascota fue eliminada.', 'success');
                        navigate(`/familias/${idFamilia}/mascotas`);
                    })
                    .catch(() => {
                        Swal.fire('Error', 'No se pudo eliminar la mascota.', 'error');
                    });
            }
        });
    };

    const handleCancelar = () => {
        Swal.fire({
            title: '¿Cancelar cambios?',
            text: 'Si cancelás, se perderán los datos no guardados.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Seguir editando',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/familias/${idFamilia}/mascotas`);
            }
        });
    };

    return (
        <div className="container d-flex justify-content-center mt-4">
            <div className="card p-4 shadow-sm" style={{ maxWidth: '600px', width: '100%' }}>
                <h4 className="mb-4">{esNueva ? 'Nueva Mascota' : 'Editar Mascota'}</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input className="form-control" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Especie</label>
                        <input className="form-control" value={form.especie} onChange={e => setForm({ ...form, especie: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Raza</label>
                        <input className="form-control" value={form.raza} onChange={e => setForm({ ...form, raza: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Edad</label>
                        <input type="number" className="form-control" value={form.edad} onChange={e => setForm({ ...form, edad: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Peso</label>
                        <input type="number" className="form-control" value={form.peso} onChange={e => setForm({ ...form, peso: e.target.value })} />
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                        <div>
                            <button type="button" className="btn btn-warning me-2" onClick={handleCancelar}>
                                Volver
                            </button>
                            <button type="submit" className="btn btn-success">Guardar</button>
                        </div>
                        {!esNueva && (
                            <button type="button" className="btn btn-danger" onClick={handleEliminar}>Eliminar</button>
                        )}

                    </div>
                </form>
            </div>
        </div>
    );
}

export default MascotaDetalle;