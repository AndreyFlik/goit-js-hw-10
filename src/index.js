import './css/styles.css';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
// const COUNTRY_URL = 'https://restcountries.com/v3.1/name/';
const searchInput = document.querySelector('#search-box');
const countryMarkup = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

let currentCoutry = '';
searchInput.addEventListener('input', debounce(inputEvent, DEBOUNCE_DELAY));

function inputEvent(event) {
  return fetchCountries(event.target.value);
}

function fetchCountries(currentCoutry) {
  return fetch(`https://restcountries.com/v3.1/name/${currentCoutry.trim()}`)
    .then(response => {
      return response.json();
    })
    .then(country => {
      renderCountry(country);
    })
    .catch(error => {
      console.log(error);
    });
}

function renderCountry(country) {
  if (country.length === 1) {
    const markup = country
      .map(countries => {
        return `
<ul>
<li>
<p><span><img src="${countries.flags.svg}" alt="" width="20"></span>Capital:${countries.capital}</p>
</li>
<li>
<p>Population:${countries.population}</p>
</li>
<li>
<p>Lenguages:${Object.values(countries.languages)}</p>
</li>
</ul>
`;
      })
      .join('');
    countryList.innerHTML = '';
    countryMarkup.innerHTML = markup;
    // countryMarkup.insertAdjacentHTML('beforeend', markup);
  } else {
    const markup = country
      .map(countries => {
        return `
  <li><h1><span><img src="${countries.flags.svg}" alt="" width="20"></span>${countries.name.official}</h1></li>
`;
      })
      .join('');
    //   countryList.insertAdjacentHTML('beforeend', markup);
    countryList.innerHTML = markup;
    countryMarkup.innerHTML = '';
  }
}
