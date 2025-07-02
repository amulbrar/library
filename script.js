const myLibrary = [];

class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
    }
}


function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  libraryContainer.innerHTML = "";

  for(let i = 0; i < myLibrary.length; i++) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.dataset.id = myLibrary[i].id;

    bookCard.innerHTML = `
    <h3>${myLibrary[i].title}</h3>
    <p>Author: ${myLibrary[i].author}</p>
    <p>Pages: ${myLibrary[i].pages}</p>
    <button class="remove-btn">Delete</button>`;

    const removeBtn = bookCard.querySelector(".remove-btn");

    removeBtn.addEventListener("click", () => {
      const bookIdToRemove = bookCard.dataset.id;

      const index = myLibrary.findIndex(book => book.id === bookIdToRemove);
      if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
      }
    });

    libraryContainer.appendChild(bookCard);
  }
}

const newBookBtn = document.querySelector("#new-book");
const bookDialog = document.querySelector("#book-dialog");

newBookBtn.addEventListener("click", () => {
  bookDialog.showModal();
});

const bookForm = document.querySelector("#book-form");

bookForm.addEventListener("submit", function(event) {
  event.preventDefault();
  
  const title = bookForm.title.value;
  const author = bookForm.author.value;
  const pages = bookForm.pages.value;

  const newBook = new Book(title, author, pages);
  addBookToLibrary(newBook);
  displayBooks();

  bookDialog.close();
});

const libraryContainer = document.querySelector(".library");