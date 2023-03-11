export default class PlanetsService {
  endpoint = `https://swapi.dev/api/planets`;
  hasNextPage = true;
  currentPage = 1;

  constructor() {}

  fetchPaginatedPlanets = () =>
    new Promise(async (resolve, reject) => {
      if (this.hasNextPage) {
        const results = await fetch(`${this.endpoint}?page=${this.currentPage}`)
          .then((res) => res.json())
          .catch(() =>
            reject({
              isError: true,
              message: 'Houve um erro ao carregar os filmes',
            })
          );

        if (results.next !== null) {
          this.currentPage = this.currentPage + 1;
        } else {
          this.hasNextPage = false;
        }

        return resolve(results.results);
      } else {
        return reject({ isError: false, message: 'Fim dos resultados' });
      }
    });
}
