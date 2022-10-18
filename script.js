const cardsContainer = document.querySelector('.cards__container');
const modal = document.querySelector('.modal');
const form = document.querySelector('.modal__form');
const modalButton = document.querySelector('.main__btn');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookPages = document.getElementById('pages');
const isRead = document.getElementById('read');

modalButton.addEventListener('click', () => modal.showModal());
form.addEventListener('submit', addBook);

let library = [];
if (localStorage.getItem('library')) {
    library = JSON.parse(localStorage.getItem('library'));
    reRenderDOM();
}

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBook(e) {
    e.preventDefault();
    const book = new Book(bookTitle.value, bookAuthor.value, bookPages.value, isRead.checked);
    library.push(book);
    updateLocalStorage();
    form.reset();
    modal.close();
    appendBookToDOM(book);
}

function appendBookToDOM(book) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-index', library.indexOf(book));
    card.innerHTML = `<p>"${book.title}"</p>`;
    card.innerHTML += `<p>${book.author}</p>`;
    card.innerHTML += `<p>${book.pages} Pages</p>`;
    const readBtn = document.createElement('button');
    readBtn.innerText = (book.isRead) ? 'Read' : 'Not Read';
    readBtn.className = `read__btn btn ${book.isRead ? 'read__btn--read' : ''}`;
    readBtn.addEventListener('click', updateReadStatus);
    card.appendChild(readBtn);
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove Book';
    removeBtn.className = 'btn remove__btn';
    removeBtn.addEventListener('click', removeCard);
    card.appendChild(removeBtn);
    cardsContainer.appendChild(card);
}
function reRenderDOM() {
    while (cardsContainer.firstChild) {
        cardsContainer.firstChild.remove();
    }
    for (let book of library) {
        appendBookToDOM(book);
    }
}

function updateReadStatus(e) {
    const readBtn = e.target;
    const card = readBtn.parentElement;
    const cardIndex = card.getAttribute('data-index');
    readBtn.innerText = readBtn.innerText === 'Read' ? 'Not Read' : 'Read';
    readBtn.classList.toggle('read__btn--read');
    library[cardIndex].isRead = !library[cardIndex].isRead;
    updateLocalStorage();
}

function removeCard(e) {
    const card = e.target.parentElement;
    const cardIndex = card.getAttribute('data-index');
    library.splice(cardIndex, 1);
    updateLocalStorage();
    reRenderDOM();
}

function updateLocalStorage() {
    localStorage.setItem('library', JSON.stringify(library));
}