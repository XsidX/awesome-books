const getBooks = () => {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  return books;
};

const addBookToStore = (book) => {
  const books = getBooks();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
};

const removeBook = (title) => {
  const books = getBooks();

  books.forEach((book, index) => {
    if (book.title === title) {
      books.splice(index, 1);
    }
  });

  localStorage.setItem('books', JSON.stringify(books));
};

const addBookToUI = (books) => {
  const container = document.querySelector('.container');

  books.forEach((book) => {
    const ul = document.createElement('ul');

    ul.innerHTML = `
    <li>${book.title}</li>
    <li>${book.author}</li>
    <button class="delete" type="button">Remove</button>
    <hr />
  `;
    container.insertBefore(ul, document.querySelector('#form'));
  });
};

const removeBookUI = (el) => {
  if (el.classList.contains('delete')) {
    el.parentElement.remove();
  }
};

// Event: Add Button
document.querySelector('#form').addEventListener('submit', (e) => {
  // Prevent default submission
  e.preventDefault();

  // get values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  // create book object
  const book = {
    title: `${title}`,
    author: `${author}`,
  };

  addBookToStore(book);
});

document.addEventListener('DOMContentLoaded', () => {
  const books = getBooks();
  addBookToUI(books);
});

// Event Remove book
document.querySelector('.container').addEventListener('click', (e) => {
  // remove from ui
  removeBookUI(e.target);

  // remove from local storage
  removeBook(e.target.previousElementSibling.previousElementSibling.textContent);
});
