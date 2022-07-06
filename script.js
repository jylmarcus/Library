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
    const edit = document.createElement('p');
    const editImg = document.createElement('img');
    const delImg = document.createElement('img');
    const library = document.querySelector('.library');

    book.setAttribute('class', 'book');
    entry.setAttribute('class', 'entry');
    title.setAttribute('class', 'title');
    author.setAttribute('class', 'author');
    pages.setAttribute('class', 'pages');
    read.setAttribute('class', 'read');
    edit.setAttribute('class', 'edit');
    editImg.setAttribute('data-modal-open', '#editModal')
    delImg.setAttribute('data-modal-delete', '#delModal')

    entry.innerHTML = index;
    title.innerHTML = object.title;
    author.innerHTML = object.author;
    pages.innerHTML = object.pages;
    editImg.src = "./img/pencil-box.svg";
    delImg.src = "./img/trash-can.svg";
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
        const modal = document.querySelector(editImg.dataset.modalOpen);
        openEditModal(modal, title, author, pages, read);

        function openEditModal(modal, title, author, pages, read){
            if (modal == null) return;
            modal.classList.add('active');
            overlay.classList.add('active');

            const titleInput = document.querySelector('#editTitle');
            const authorInput = document.querySelector('#editAuthor');
            const pagesInput = document.querySelector('#editPages');
            const readInput = document.querySelector('#editRead');
            
            titleInput.defaultValue = title.innerHTML;
            authorInput.defaultValue = author.innerHTML;
            pagesInput.defaultValue = pages.innerHTML;
            switch (read.innerHTML){
                case "Plan To Read":
                    readInput.value = 'planToRead';
                    break;
                case "In Progress":
                    readInput.value = 'inProgress';
                    break;
                case "Completed":
                    readInput.value = 'completed';
                    break;
            }
        }
    })

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

    const modal = document.querySelector(".closeNewBook").closest('.modal');
    closeModal(modal);

    const form = document.getElementById('newBook');
    form.reset();
}

const openModalButton = document.querySelector('[data-modal-target]');
const closeModalButton = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

openModalButton.addEventListener('click',()=> {
    const modal = document.querySelector(openModalButton.dataset.modalTarget);
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