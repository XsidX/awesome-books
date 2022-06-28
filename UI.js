import BookStore from './BookStore.js';
// class UI
export default class UI {
  // display books
  static displayBooks() {
    const books = BookStore.getBooks();

    books.forEach((book) => {
      UI.addBookToUI(book);
    });
  }

  // add book to UI

  static addBookToUI(book) {
    const container = document.querySelector('.container');

    const ul = document.createElement('ul');

    ul.innerHTML = `
      <li>"${book.title}"</li>
      <li>by ${book.author}</li>
     
      <button class="delete" type="button">Remove</button>
    `;
    container.appendChild(ul);
  }

  static removeBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const main = document.querySelector('main');
    main.insertBefore(div, container);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  // clear input form
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}
