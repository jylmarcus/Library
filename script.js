let myLibrary = [];
const libraryWrapper = document.getElementById("library");

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function renderLibrary(library){
    for(object in library){
        renderBook(object);
    }
}

function renderBook(object){
    const book = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const read = document.createElement('p');
    book.setAttribute('class', 'book');
    title.setAttribute('class', 'title');
    author.setAttribute('class', 'author');
    pages.setAttribute('class', 'pages');
    read.setAttribute('class', 'read');
    title.innerHTML = object.title;
    author.innerHTML = object.author;
    pages.innerHTML = object.pages;
    switch (object.read){
        case "planToRead":
            read.innerHTML = "Plan To Read";
            break;
        case "inProgress":
            read.innerHTML = "In Progress";
            break;
        case "completed":
            read.innerHTML = "Completed";
            break;
    }
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(read);
    libraryWrapper.appendChild(book);
}

function addBookToLibrary() {
    title = document.getElementById("title").value;
    author = document.getElementById("author").value;
    pages = document.getElementById("pages").value;
    read = document.getElementById("read").value;
    let newBook = new Book(title,author,pages,read);
    myLibrary.push(newBook);
    renderBook(newBook);
}