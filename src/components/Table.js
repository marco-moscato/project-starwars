import React, { useEffect, useState } from 'react';
import fetchPlanetsAPI from '../services/fetchPlanetsAPI';
import Filter from './Filter';
import './Table.css';

export default function Table() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [planetsKeys, setPlanetsKeys] = useState([]);
  const [filter, setFilter] = useState('');

  // Falta retirar a chave residents do array;
  useEffect(
    () => {
      setLoading(true);
      fetchPlanetsAPI()
        .then((response) => {
        // const planetsArray = [...response];
        // const filterPlanets = response.map((planet) => planet.residents);
          setPlanets(response);
          setPlanetsKeys(Object.keys(response[0]));
          setLoading(false);
        });
    },
    [],
  );

  return (
    <div>
      <Filter />
      { loading && <h3>...LOADING...</h3> }
      <table className="planetsTable">
        <thead>
          <tr>
            {/* Refatorar para evitar de usar o state */}
            { planetsKeys.map((keys) => <th key={ keys }>{ keys }</th>)}
          </tr>
        </thead>
        <tbody>
          {/* Refatorar esse map para reduzir a quantidade de linhas */}
          { planets.map((planet) => (
            <tr key={ planet }>
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
