let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "already read" : "not read yet"}`;
  };
}

Book.prototype.toggleRead = function() {
  this.read = this.read === 'read' ? 'not read' : 'read';
};

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

function displayLibrary() {
  let libraryContainer = document.getElementById("library-container");
  libraryContainer.innerHTML = "";
  myLibrary.forEach((book, index) => {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    let bookTitle = document.createElement("div");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = book.title;

    let bookAuthor = document.createElement("div");
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = book.author;

    let bookInfo = document.createElement("div");
    bookInfo.classList.add("book-info");
    bookInfo.textContent = `${book.pages} pages, ${book.read ? "read" : "not read"}`;
   
    let removeButton = document.createElement("button");
    removeButton.id="remove";
    removeButton.textContent = "Remove";
    removeButton.setAttribute("data-index", index);
    removeButton.addEventListener("click", removeBookFromLibrary);

    let toggleReadButton = document.createElement("button");
    toggleReadButton.id= "toggle";
    toggleReadButton.textContent = "Toggle Read";
    toggleReadButton.setAttribute("data-index", index);
    toggleReadButton.addEventListener("click", toggleReadStatus);

    bookCard.appendChild(removeButton);
    bookCard.appendChild(toggleReadButton);
    bookCard.appendChild(bookInfo);
    libraryContainer.appendChild(bookCard);
  });
}

function removeBookFromLibrary(event) {
  let index = event.target.getAttribute("data-index");
  myLibrary.splice(index, 1);
  displayLibrary();
}

function toggleReadStatus(event) {
  let index = event.target.getAttribute("data-index");
  myLibrary[index].toggleRead();
  displayLibrary();
}

const newBookBtn = document.querySelector("#new-book-btn");
const newBookForm = document.querySelector("#new-book-form");
const form = document.querySelector("#new-book-form form");
let submitButton = form.querySelector("input[type='submit']");

newBookBtn.addEventListener("click", function () {
  newBookForm.style.display = "block";
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
 
  const title = form.elements.title.value;
  const author = form.elements.author.value;
  const pages = form.elements.pages.value;
  const read = form.elements.read.checked;

  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);

  form.reset();
  newBookForm.style.display = "none";

  displayLibrary();

  render();
});
