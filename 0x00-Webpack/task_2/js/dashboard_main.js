import $ from 'jquery';
import _ from 'lodash';
// import logoImg from '../assets/holberton-logo.jpg';
import '../css/main.css';


// var img = $('<img>')[0];
// img.src = logoImg;
// console.log(img);
// $('body').append($('<div id="logo"></div>').append(img));
$('body').append('<div id="logo"></div>');
$('body').append('<p>Holberton Dashboard</p>');
$('body').append('<p>Dashboard data for the students</p>');
$('body').append('<button>Click here to get started</button>');
$('body').append(`<p id='count'></p>`);
$('body').append('<p>Copyright - Holberton School</p>');

let count = 0;
const updateCounter = () => $('#count').html(`${++count} clicks on the button`);

$('button').on('click', _.debounce(updateCounter, 500, { 'leading': true }));
