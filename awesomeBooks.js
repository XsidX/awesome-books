import Book from './Book.js';
import BookStore from './BookStore.js';
import UI from './UI.js';

const bookList = document.querySelector('#view-book');
const form = document.querySelector('#add-book');
const contact = document.querySelector('#contact');

const listLink = document.querySelector('.list-book');
const addBookLink = document.querySelector('.add-new');
const contactLink = document.querySelector('.contact-link');

listLink.addEventListener('click', (e) => {
  e.preventDefault();
  listLink.classList.add('active');
  addBookLink.classList.remove('active');
  contactLink.classList.remove('active');

  bookList.className = 'book-list-wrapper display-block';
  form.className = 'display-none';
  contact.className = 'display-none';
});

addBookLink.addEventListener('click', (e) => {
  e.preventDefault();
  listLink.classList.remove('active');
  addBookLink.classList.add('active');
  contactLink.classList.remove('active');

  form.className = 'display-flex content-container';
  bookList.className = 'display-none';
  contact.className = 'display-none';
});

contactLink.addEventListener('click', (e) => {
  e.preventDefault();
  listLink.classList.remove('active');
  addBookLink.classList.remove('active');
  contactLink.classList.add('active');

  contact.className = 'display-flex';
  form.className = 'display-none';
  bookList.className = 'display-none';
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
  const title = e.target.previousElementSibling.previousElementSibling.textContent.replace(/[^a-z0-9]/gi, '');
  BookStore.removeBook(title);
});

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const dateObj = new Date();
const month = monthNames[dateObj.getUTCMonth() + 1]; // months from 1-12
const day = dateObj.getUTCDate();
const year = dateObj.getUTCFullYear();

const newdate = `${month} ${day} ${year}`;
const time = new Date().toLocaleTimeString().toLowerCase();

document.querySelector('.date').textContent = `${newdate}, ${time}`;