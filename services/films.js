export default class FilmsService {
  endpoint = `https://swapi.dev/api/films`;
  nextPage = this.endpoint;

  constructor() {}

  fetchPaginatedFilms = () =>
    new Promise(async (resolve, reject) => {
      if (this.nextPage !== null) {
        const results = await fetch(this.nextPage)
          .then((res) => res.json())
          .catch(() => reject('Houve um erro ao carregar os filmes'));

        this.nextPage = results.nextPage;
        return resolve(results.results);
      } else {
        return reject('Fim dos resultados');
      }
    });
}
