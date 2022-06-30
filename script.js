let myLibrary = [];
const libraryWrapper = document.getElementById("library");

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function renderLibrary(library){
    let index = 1;
    for(object in library){
        renderBook(object, index);
        index++;
    }
}

function renderBook(object, index){
    const book = document.createElement('div');
    const entry = document.createElement('p');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const read = document.createElement('p');
    const library = document.getElementsByClassName('library');
    book.setAttribute('class', 'book');
    entry.setAttribute('class', 'entry');
    title.setAttribute('class', 'title');
    author.setAttribute('class', 'author');
    pages.setAttribute('class', 'pages');
    read.setAttribute('class', 'read');
    entry.innerHTML = index;
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
    library.appendChild(book);
}

function addBookToLibrary() {
    title = document.getElementById("title").value;
    author = document.getElementById("author").value;
    pages = document.getElementById("pages").value;
    read = document.getElementById("read").value;
    let newBook = new Book(title,author,pages,read);
    myLibrary.push(newBook);
    let index = myLibrary.length;
    renderBook(newBook, index);
}

function showForm(){
    const form = document.getElementById('newBook');
    form.classList.toggle("show");
}