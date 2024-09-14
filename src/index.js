import './style.css';
import weatherInformation from './weather.js'
import aurora from './aurora.jpeg';

const form = document.querySelector('form');

form.addEventListener('submit',weatherInformation);