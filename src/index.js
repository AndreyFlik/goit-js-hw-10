import './css/styles.css';
// import { fetchCountries } from './fetchCountries.js';

import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
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
      //   console.log(response.json());
      if (response.ok) {
        return response.json();
      }
    })
    .then(country => {
      console.log(country);
      if (country.length > 10) {
        countryMarkup.innerHTML = '';
        countryList.innerHTML = '';
        return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      } else {
        renderCountry(country);
      }
    })
    .catch(error => {
      countryMarkup.innerHTML = '';
      countryList.innerHTML = '';
      if (currentCoutry != 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
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
  } else {
    const markup = country
      .map(countries => {
        return `
  <li><h1><span><img src="${countries.flags.svg}" alt="" width="20"></span>${countries.name.official}</h1></li>
`;
      })
      .join('');
    countryList.innerHTML = markup;
    countryMarkup.innerHTML = '';
  }
}
