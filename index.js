function Book() {

}

function addBookToLibrary(book) {

}

const library = [];

const addBookButton = document.querySelector(".button-container");
addBookButton.addEventListener("click", () => {
    var popup = document.querySelector(".add-book-popup");
    popup.classList.toggle("show");
});