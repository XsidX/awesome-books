import Book from "./Book.js";
import BookStore from "./BookStore.js";
import UI from "./UI.js";

// Event: Add Button
document.querySelector("#form").addEventListener("submit", (e) => {
  // Prevent default submission
  e.preventDefault();

  // get values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;

  const book = new Book(title, author);

  UI.addBookToUI(book);

  BookStore.addBookToStore(book);
});

document.addEventListener("DOMContentLoaded", () => {
  UI.displayBooks();
});

// Event Remove book
document.querySelector(".container").addEventListener("click", (e) => {
  // remove from ui
  UI.removeBook(e.target);

  // remove from local storage

  BookStore.removeBook(
    e.target.previousElementSibling.previousElementSibling.textContent.replace(
      /[/W_]+/g,
      ""
    )
  );
});
