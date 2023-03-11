import FilmsService from './services/films.js';
const filmModal = document.getElementById('film-modal');
const filmModalTitle = document.getElementById('film-modal-title');
const filmModalContent = document.getElementById('film-modal-content');

const modalContentEpisodeNumber = document.getElementById(
  'modal-content-episode-number'
);
const modalContentCreated = document.getElementById('modal-content-created');
const modalContentDirector = document.getElementById('modal-content-director');
const modalContentProducer = document.getElementById('modal-content-producer');
const modalContentOpeningCrawl = document.getElementById(
  'modal-content-opening-crawl'
);

const filmsService = new FilmsService();

function openModal(film) {
  filmModal.style.display = 'block';

  modalContentEpisodeNumber.innerText = `Episódio: ${film.episode_id}`;
  modalContentDirector.innerText = `Diretor: ${film.director}`;
  modalContentProducer.innerText = `Produtor: ${film.producer}`;
  modalContentOpeningCrawl.innerText = `${film.opening_crawl}`;
  modalContentCreated.innerText = `Lançamento: ${new Intl.DateTimeFormat(
    'pt-BR'
  ).format(new Date(film.release_date))}`;

  filmModalTitle.innerText = film.title;
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
