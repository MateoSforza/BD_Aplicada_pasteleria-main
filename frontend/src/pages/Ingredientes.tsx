import React from 'react';
import { useIngredientes } from '../hooks/useIngredientes';


const Ingredientes: React.FC = () => {
    const { data, isLoading, error } = useIngredientes();

    React.useEffect(() => {
        console.log('Ingredientes data:', data);
    }, [data]);

    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar ingredientes</div>;

    return (
        <div>
            <h1>Ingredientes</h1>
            <ul>
                {(Array.isArray(data) ? data : []).map((ing) => (
                    <li key={ing.idIngrediente}>{ing.nombre} - {ing.unidadCompra} - {ing.precioUnitario}</li>
                ))}
            </ul>
        </div>
    );
};

export default Ingredientes;
