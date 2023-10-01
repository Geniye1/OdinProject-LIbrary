const BookBase = {
    library: [],

    updateRead: function() {
        this.read = true;
    },

    addToLibrary: function() {
        this.library.push(this);

        const bookContainer = document.querySelector(".book-container");
        const newBookDiv = document.createElement("div");
        const newBookPTitle = document.createElement("p");
        newBookDiv.classList.add("book");
        newBookDiv.setAttribute("data-book-id", this.library.length - 1);
        newBookPTitle.textContent = this.title;
        newBookDiv.appendChild(newBookPTitle);
        bookContainer.appendChild(newBookDiv);
    }
}

function createNewBook(title, author, pageCount, hasRead, review) {
    var newBook = Object.create(BookBase);
    newBook.title = title;
    newBook.author = author;
    newBook.pageCount = pageCount;
    newBook.hasRead = hasRead;
    newBook.review = review;

    return newBook;
}

const popup = document.querySelector(".add-book-popup");
const addBookPopupButton = document.querySelector(".button-container");
addBookPopupButton.addEventListener("click", () => {
    popup.classList.toggle("show");
});

const addBookButton = document.querySelector("#add-book-button");
addBookButton.addEventListener("click", () => {
    popup.classList.toggle("show");

    var titleIn = document.getElementById("title");
    var authorIn = document.getElementById("author");
    var pageCountIn = document.getElementById("page-count");
    var hasReadIn = document.getElementById("has-read-checkbox");
    var reviewIn = document.getElementById("review");  
    
    var newBook = createNewBook(titleIn.value, authorIn.value, pageCountIn.value, hasReadIn.value, reviewIn.value);
    newBook.addToLibrary();

    titleIn.value = "";
    authorIn.value = "";
    pageCountIn.value = "";
    hasReadIn.checked = false;
    reviewIn.value = "";
});

// Allow the user to press ESC to close the popup window but ONLY if the popup window is open
document.addEventListener("keydown", (event) => {
    if (event.key == "Escape" && popup.classList.contains("show")) {
        popup.classList.toggle("show");
    }
}, false);