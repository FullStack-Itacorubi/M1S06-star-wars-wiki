import FilmsService from './services/films.js';
const filmModal = document.getElementById('film-modal');
const filmModalTitle = document.getElementById('film-modal-title');
const filmModalContent = document.getElementById('film-modal-content');

const filmsService = new FilmsService(3);

function openModal(film) {
  filmModal.style.display = 'block';
  const episodeNumber = document.createElement('p');
  const created = document.createElement('p');
  const director = document.createElement('p');
  const producer = document.createElement('p');
  const openingCrawl = document.createElement('p');

  episodeNumber.innerText = `Episódio: ${film.episode_id}`;
  director.innerText = `Diretor: ${film.director}`;
  producer.innerText = `Produtor: ${film.producer}`;
  openingCrawl.innerText = `${film.opening_crawl}`;
  created.innerText = `Lançamento: ${new Intl.DateTimeFormat('pt-BR').format(
    new Date(film.release_date)
  )}`;

  filmModalTitle.innerText = film.title;
  filmModalContent.appendChild(episodeNumber);
  filmModalContent.appendChild(created);
  filmModalContent.appendChild(director);
  filmModalContent.appendChild(producer);
  filmModalContent.appendChild(openingCrawl);
}

function showFilms(films) {
  const filmsWrapper = document.getElementById('films-wrapper');

  films.sort((a, b) => a.episode_id - b.episode_id);

  films.forEach((film) => {
    const filmContent = document.createElement('div');
    filmContent.className = 'film';
    filmContent.onclick = () => openModal(film);
    const title = document.createElement('h3');
    const created = document.createElement('p');
    const episodeNumber = document.createElement('p');

    episodeNumber.innerText = `Episódio: ${film.episode_id}`;
    title.innerText = film.title;
    created.innerText = `Lançamento: ${new Intl.DateTimeFormat('pt-BR').format(
      new Date(film.release_date)
    )}`;

    filmContent.appendChild(episodeNumber);
    filmContent.appendChild(title);
    filmContent.appendChild(created);
    filmsWrapper.appendChild(filmContent);
  });
}

async function getFilms() {
  const loader = document.getElementById('loader-wrapper');
  loader.style.display = 'flex';
  const films = await filmsService.fetchPaginatedFilms();
  loader.style.display = 'none';

  showFilms(films);
}

getFilms();
