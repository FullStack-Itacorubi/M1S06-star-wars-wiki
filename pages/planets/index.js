import PlanetsService from '../../services/planets.js';
const planetModal = document.getElementById('planet-modal');
const planetModalTitle = document.getElementById('planet-modal-title');
const modalContentPopulation = document.getElementById(
  'modal-content-population'
);
const modalContentTerrain = document.getElementById('modal-content-terrain');
const modalContentClimate = document.getElementById('modal-content-climate');
const modalContentDiameter = document.getElementById('modal-content-diameter');
const modalContentOrbitalPeriod = document.getElementById(
  'modal-content-orbital-period'
);

const getMoreButton = document.getElementById('get-more-button');
getMoreButton.onclick = () => getPlanets();

const planetsService = new PlanetsService(3);

function openModal(planet) {
  modalContentPopulation.innerText = `População: ${planet.population}`;
  modalContentOrbitalPeriod.innerText = `Período orbital: ${planet.orbital_period}`;
  modalContentClimate.innerText = `Clima: ${planet.climate}`;
  modalContentDiameter.innerText = `Diâmetro: ${planet.diameter}`;
  modalContentTerrain.innerText = `Biomas: ${planet.terrain}`;

  planetModalTitle.innerText = planet.name;
  planetModal.style.display = 'block';
}

function showPlanets(planets) {
  const planetsWrapper = document.getElementById('planets-wrapper');

  planets.forEach((planet) => {
    const planetContent = document.createElement('div');
    planetContent.className = 'planet';
    planetContent.onclick = () => openModal(planet);
    const name = document.createElement('h3');
    const population = document.createElement('p');
    const terrain = document.createElement('p');

    terrain.innerText = `Biomas: ${planet.terrain}`;
    name.innerText = planet.name;
    population.innerText = `População: ${planet.population}`;

    planetContent.appendChild(terrain);
    planetContent.appendChild(name);
    planetContent.appendChild(population);
    planetsWrapper.appendChild(planetContent);
  });
}

async function getPlanets() {
  const loader = document.getElementById('loader-wrapper');
  loader.style.display = 'flex';
  getMoreButton.style.display = 'none';

  const planets = await planetsService
    .fetchPaginatedPlanets()
    .then((res) => {
      getMoreButton.style.display = 'block';
      return res;
    })
    .catch((res) => window.alert(res.message));

  loader.style.display = 'none';

  showPlanets(planets);
}

getPlanets();
