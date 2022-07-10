let myLibrary = [];
var currentBook = null;
var currentBookDiv = null;
var modalHeader = document.querySelector('.modalHeaderText');

function onSubmit() {
    let formData = readFormData();
    if (currentBook == null){
        addBookToLibrary(formData);
    } else {
        editBook(formData);
    }
    currentBook = null;
    currentBookDiv = null;
    const form = document.getElementById('bookForm');
    form.reset();
}

function readFormData() {
    let formData = {};
    formData["title"] = document.getElementById('title').value;
    formData["author"] = document.getElementById('author').value;
    formData["pages"] = document.getElementById('pages').value;
    formData["read"] = document.getElementById('read').value;
    return formData;
}

function Book(data) {
    this.title = data.title
    this.author = data.author
    this.pages = data.pages
    this.read = data.read
}

function addBookToLibrary(data) {

    myLibrary.push(new Book(data));
    let index = myLibrary.length;
    renderBook(data, index);

    const modal = document.querySelector(".modal");
    closeModal(modal);
}

function renderLibrary(library){
    let index = 1;
    for(object in library){
        renderBook(object, index);
        index++;
    }
}

function getBookByIndex(index){
    return myLibrary[index];
}

function renderBook(data, index){
    const book = document.createElement('div');
    const entry = document.createElement('p');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const read = document.createElement('p');
    const edit = document.createElement('p');
    const editImg = document.createElement('img');
    const delImg = document.createElement('img');
    const library = document.querySelector('.library');

    book.setAttribute('class', 'book');
    book.setAttribute('id', `${index}`);
    entry.setAttribute('class', 'entry');
    title.setAttribute('class', 'title');
    author.setAttribute('class', 'author');
    pages.setAttribute('class', 'pages');
    read.setAttribute('class', 'read');
    edit.setAttribute('class', 'edit');
    editImg.setAttribute('data-modal-open', '#editModal')
    delImg.setAttribute('data-modal-delete', '#delModal')

    entry.innerHTML = index;
    title.innerHTML = data.title;
    author.innerHTML = data.author;
    pages.innerHTML = data.pages;
    switch (data.read){
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

    editImg.src = "./img/pencil-box.svg";
    delImg.src = "./img/trash-can.svg";
    

    edit.appendChild(editImg);
    edit.appendChild(delImg);
    book.appendChild(entry);
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(read);
    book.appendChild(edit);

    book.addEventListener('mouseenter', ()=>{
        book.classList.add('hover');
        editImg.src = "./img/pencil-box-outline.svg";
        delImg.src = "./img/trash-can-outline.svg";
    })
    book.addEventListener('mouseleave', () =>{
        book.classList.remove('hover');
        editImg.src = "./img/pencil-box.svg";
        delImg.src = "./img/trash-can.svg";
    })

    editImg.addEventListener('click', ()=>{
        const modal = document.querySelector('.modal');
        modalHeader.innerHTML = 'Edit book';
        currentBook = myLibrary[index-1];
        console.log(currentBook);
        currentBookDiv = book;
        openEditModal(modal, currentBook);
    })

    library.appendChild(book);
}

function openEditModal(modal, currentBook){
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');

    titleInput = document.getElementById('title');
    authorInput = document.getElementById('author');
    pagesInput = document.getElementById('pages');
    readInput = document.getElementById('read');
    
    titleInput.value = currentBook.title;
    authorInput.value = currentBook.author;
    pagesInput.value = currentBook.pages;
    readInput.value = currentBook.read;
}

function editBook(data){
    title = currentBookDiv.children[1];
    author = currentBookDiv.children[2];
    pages = currentBookDiv.children[3];
    read = currentBookDiv.children[4];

    title.innerHTML = data.title;
    author.innerHTML = data.author;
    pages.innerHTML = data.pages;
    switch (data.read){
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

    currentBook.title = data.title;
    currentBook.author = data.author;
    currentBook.pages = data.pages;
    currentBook.read = data.read;

    const modal = document.querySelector(".modal")
    closeModal(modal);
}

const addBookButton = document.querySelector('.addBookButton');
const closeModalButton = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

addBookButton.addEventListener('click',()=> {
    const modal = document.querySelector('.modal');
    modalHeader.innerHTML = 'Add a book';
    openModal(modal);
})

closeModalButton.forEach(button => {
    button.addEventListener('click',()=> {
        const modal = button.closest('.modal');
        closeModal(modal);
    })
})

function openModal(modal){
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal){
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}