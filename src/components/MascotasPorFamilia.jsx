import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API_BASE_URL from '../config/config';

const MascotasPorFamilia = () => {
    const { idFamilia } = useParams();
    const [mascotas, setMascotas] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/mascotas/familia/${idFamilia}`)
            .then(res => res.json())
            .then(data => setMascotas(data))
            .catch(err => console.error('Error al obtener mascotas:', err));
    }, [idFamilia]);

    return (
        <div className="container">
            <h2>Mascotas de la Familia</h2>
            <div className="d-flex gap-3 my-4">
                <Link to={`/familias`} className="btn btn-sm btn-warning" style={{ width: '150px' }}>
                    Volver
                </Link>
                <Link to={`/familias/${idFamilia}/mascotas/detalle/`} className="btn btn-sm btn-primary" style={{ width: '150px' }}>
                    Agregar Mascota
                </Link>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Especie</th>
                        <th>Raza</th>
                        <th>Edad</th>
                        <th>Peso</th>
                        <th>Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    {mascotas.length > 0 ? (
                        mascotas.map((m) => (
                            <tr key={m.id}>
                                <td>{m.nombre}</td>
                                <td>{m.especie}</td>
                                <td>{m.raza}</td>
                                <td>{m.edad}</td>
                                <td>{m.peso} kg</td>
                                <td>
                                    <Link to={`/familias/${idFamilia}/mascotas/detalle/${m.id}`} className="btn btn-sm btn-outline-primary me-1">
                                        Detalles
                                    </Link>
                                    <Link to={`/consultas/${m.id}/${m.nombre}/${idFamilia}`} className="btn btn-sm btn-outline-success">
                                        Consultas
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No hay mascotas registradas</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MascotasPorFamilia;
