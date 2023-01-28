const fetchPlanetsAPI = async () => {
  const request = await fetch('https://swapi.dev/api/planets');
  const response = await request.json();
  return response.results;
};

export default fetchPlanetsAPI;
