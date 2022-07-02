import Book from './Book.js';
import BookStore from './BookStore.js';
import UI from './UI.js';

const navItems = document.querySelector('.nav-items');
const navLinks = document.querySelectorAll('.nav-links');
const sections = document.querySelectorAll('.section');

navItems.addEventListener('click', (e) => {
  e.preventDefault();
  const clicked = e.target.closest('.nav-links');
  if (!clicked.classList.contains('nav-links')) return;

  const { tab } = clicked.dataset;
  navLinks.forEach((link) => link.classList.remove('active'));
  clicked.classList.add('active');

  sections.forEach((section) => section.classList.remove('display-flex'));
  document.querySelector(`.section-${tab}`).classList.add('display-flex');
});

// Event: Add Button
document.querySelector('#form').addEventListener('submit', (e) => {
  // Prevent default submission
  e.preventDefault();

  // get values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  // Validate
  if (title === '' || author === '') {
    UI.showAlert('Please fill in all fields', 'error');
  } else {
    const book = new Book(title, author);

    UI.addBookToUI(book);

    BookStore.addBookToStore(book);

    UI.clearFields();

    UI.showAlert('Book added', 'success');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  UI.displayBooks();
});

// Event Remove book
document.querySelector('.container').addEventListener('click', (e) => {
  // remove from ui
  UI.removeBook(e.target);

  // remove from local storage
  const title = e.target.previousElementSibling.previousElementSibling.textContent.replace(
    /[^a-z0-9]/gi,
    '',
  );
  BookStore.removeBook(title);
});

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const dateObj = new Date();
const month = monthNames[dateObj.getUTCMonth() + 1]; // months from 1-12
const day = dateObj.getUTCDate();
const year = dateObj.getUTCFullYear();

const newdate = `${month} ${day} ${year}`;
const time = new Date().toLocaleTimeString().toLowerCase();

document.querySelector('.date').textContent = `${newdate}, ${time}`;
