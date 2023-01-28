import React, { useEffect, useState } from 'react';
import fetchPlanetsAPI from '../services/fetchPlanetsAPI';

export default function Table() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);

  // Falta retirar a chave residents do array;
  useEffect(
    () => {
      setLoading(true);
      fetchPlanetsAPI()
        .then((response) => {
        // const planetsArray = [...response];
        // const filterPlanets = response.map((planet) => planet.residents);
          setPlanets(response);
          setLoading(false);
        });
    },
    [],
  );

  return (
    <div>
      { loading && <h3>...LOADING...</h3> }
      <table>
        <thead>
          <tr>
            <th>
              { planets.map((planet) => Object.keys(planet)) }
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
}
