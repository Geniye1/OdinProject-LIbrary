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
            bookInView = this;
        })

        if (this.hasRead) {
            hasReadButton.innerHTML = hasReadSvgPath;
            hasReadButton.classList.add("has-read");
        }

        newBookDiv.appendChild(newBookPTitle);
        bookContainer.appendChild(newBookDiv);

        return this.library.length - 1;
    },

    deleteBook: function(book) {
        this.library.splice(this.library.indexOf(book), 1);
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

    // Set ID of book so that if it needs to be deleted it can be referenced via this ID
    newBook.id = newBook.addToLibrary()
}

function displayBookInformation(book) {
    informationPopup.classList.toggle("show");
    currentPopupShown = informationPopup;

    const titleHeading = document.querySelector("#information-title");
    const authorHeading = document.querySelector("#information-author");
    const reviewParagraph = document.querySelector("#information-review");
    titleHeading.textContent = book.title;
    authorHeading.textContent = `by ${book.author}`;
    reviewParagraph.textContent = book.review;
}

// The current book the user is viewing the information of
// (used when the user wants to delete it or update the hasRead property of it)
var bookInView = null;

// SVG PATHS FOR UPDATING THE HASREAD UI OF THE INFORMATION CONTAINER 
const hasntReadSvgPath = '<path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />';
const hasReadSvgPath = '<path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z" />';
const hasReadButton = document.querySelector("#has-read-radio-button");

const deleteButton = document.querySelector("#delete-book-button");

// Popups and the current popup to make it easier to generally toggle visibility to whichever popup is currently being called
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

/* INFORMATION OPTIONS BUTTONS */
// Delete book button
deleteButton.addEventListener("click", () => {
    //BookBase.deleteBook(bookInView);
    // bookInView = null;
    // currentPopupShown.classList.toggle("show");
    // Update the HTML first
    var bookDiv = document.querySelector(`.book[data-book-id="${bookInView.id}"]`);
    bookDiv.remove();
    currentPopupShown.classList.toggle("show");

    // Remove the book from the JS library
    BookBase.deleteBook(bookInView);
    bookInView = null;
    console.log(`Library updated, new length: ${BookBase.library.length}`);
});

// Update hasRead button
hasReadButton.addEventListener("click", () => {
    bookInView.updateRead();
    hasReadButton.innerHTML = hasReadSvgPath;
    hasReadButton.classList.add("has-read");
});

// Allow the user to press ESC to close the popup window but ONLY if the popup window is open
document.addEventListener("keydown", (event) => {
    if (event.key == "Escape" && currentPopupShown != null) {
        currentPopupShown.classList.toggle("show");
        currentPopupShown = null;

        // If it was the information popup, then we have to reset the bookInView variable
        if (bookInView != null) bookInView = null;
    }
}, false);

/* DEBUG */
var debugBook = addNewBook("Walden", "Thoreau", 300, false, "Asinine - truly an asinine experience. I hope Thoreau got ticks on his cock for this book. It makes me want to start my own coal mine and double the CO2 output of America purely to spite him.");