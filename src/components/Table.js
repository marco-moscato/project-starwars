import React, { useContext } from 'react';
import { FetchContext } from '../context/FetchContext';
import './Table.css';

export default function Table() {
  const { loading, planets, planetsKeys } = useContext(FetchContext);

  return (
    <div>
      { loading && <h3>CARREGANDO...</h3> }
      <table className="planetsTable">
        <thead>
          <tr>
            {/* Refatorar para evitar de usar o state */}
            { planetsKeys.map((key) => <th key={ key }>{ key }</th>)}
          </tr>
        </thead>
        <tbody>
          {/* Refatorar esse map para reduzir a quantidade de linhas */}
          { planets.map((planet) => (
            <tr key={ planet.name }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.residents }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Table.propTypes = {
//   keys
// }
