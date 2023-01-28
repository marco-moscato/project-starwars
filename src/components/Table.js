import React, { useEffect, useState } from 'react';
import fetchPlanetsAPI from '../services/fetchPlanetsAPI';

export default function Table() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => async () => fetchPlanetsAPI()
    .then((response) => setPlanets(response)), []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              {/* { planets } */}
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
}
