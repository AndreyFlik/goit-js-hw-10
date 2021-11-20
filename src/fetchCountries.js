function fetchCountries(currentCoutry) {
  return fetch(`https://restcountries.com/v3.1/name/${currentCoutry.trim()}`).then(response => {
    if (response.status === 404) {
      return Promise.reject('Oops, there is no country with that name');
    }
    return response.json();
  });
}
export { fetchCountries };
