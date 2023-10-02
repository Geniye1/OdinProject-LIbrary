// BOOK PROTOTYPE
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

        newBookDiv.addEventListener("click", () => {
            displayBookInformation(this);
            
        })

        newBookDiv.appendChild(newBookPTitle);
        bookContainer.appendChild(newBookDiv);
    }
}

// CONSTRUCT BOOK OBJECT FROM PROTOTYPE
function addNewBook(title, author, pageCount, hasRead, review) {
    var newBook = Object.create(BookBase);
    newBook.title = title;
    newBook.author = author;
    newBook.pageCount = pageCount;
    newBook.hasRead = hasRead;
    newBook.review = review;

    newBook.addToLibrary()
}

function displayBookInformation(book) {
    informationPopup.classList.toggle("show");
    currentPopupShown = informationPopup;
    
    const informationContainer = document.querySelector(".information-container");
    const titleHeading = document.createElement("h1");
    const authorHeading = document.createElement("h2");
    const reviewParagraph = document.createElement("p");
    titleHeading.textContent = book.title;
    authorHeading.textContent = book.author;
    reviewParagraph.textContent = book.review;

    informationContainer.appendChild(titleHeading);
    informationContainer.appendChild(authorHeading);
    informationContainer.appendChild(reviewParagraph);
}

const popup = document.querySelector(".add-book-popup");
const informationPopup = document.querySelector(".information-popup"); 
var currentPopupShown = null;

const addBookPopupButton = document.querySelector(".button-container");
addBookPopupButton.addEventListener("click", () => {
    popup.classList.toggle("show");
    currentPopupShown = popup;
});

const addBookButton = document.querySelector("#add-book-button");
addBookButton.addEventListener("click", () => {
    popup.classList.toggle("show");

    var titleIn = document.getElementById("title");
    var authorIn = document.getElementById("author");
    var pageCountIn = document.getElementById("page-count");
    var hasReadIn = document.getElementById("has-read-checkbox");
    var reviewIn = document.getElementById("review");  
    
    var newBook = addNewBook(titleIn.value, authorIn.value, pageCountIn.value, hasReadIn.value, reviewIn.value);

    titleIn.value = "";
    authorIn.value = "";
    pageCountIn.value = "";
    hasReadIn.checked = false;
    reviewIn.value = "";
});

// Allow the user to press ESC to close the popup window but ONLY if the popup window is open
document.addEventListener("keydown", (event) => {
    if (event.key == "Escape" && currentPopupShown != null) {
        currentPopupShown.classList.toggle("show");
        currentPopupShown = null;
    }
}, false);

/* DEBUG */
var debugBook = addNewBook("Walden", "Thoreau", 300, false, "Asinine - truly an asinine experience. I hope Thoreau got ticks on his cock for this book.");