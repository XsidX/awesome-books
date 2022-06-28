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
      <li>${book.title}</li>
      <li>${book.author}</li>
      <button class="delete" type="button">Remove</button>
      <hr />
    `;
    container.insertBefore(ul, document.querySelector('#form'));
  }

  static removeBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.remove();
    }
  }
}