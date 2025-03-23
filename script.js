const myLibrary = [];

// Class for each book
class Book{

    constructor(title,author,pages,read){

        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

}

const entry = document.querySelector('.entry');
const submit = document.querySelector('.submit');

let val = 0;

function validation(){
    const name = document.getElementById('title');
    const author = document.getElementById('author');
    const pages =  document.getElementById('pages');

    if(name.checkValidity()&&author.checkValidity()&&pages.checkValidity()){
        return true
    }else{
        return false
    }
}

// Event for form pop-up
entry.addEventListener('click', () => {
    document.querySelector('.popUp').style.display = 'block';
});

// Event for form submission
submit.addEventListener('click', () => {
    let flag = validation()

    if(flag == true){
        document.querySelector('.popUp').style.display = 'none';
        addBookToLibrary()
        createCard(myLibrary[myLibrary.length - 1], val);
        val++;
    }else{
        return
    }
});

// Function to create book display
function createCard(book, index) {
    const display = document.createElement('div');
    display.classList.add('card');
    display.setAttribute('data-index', index);

    const title = document.createElement('p');
    title.innerText = book.title;
    display.appendChild(title);

    const author = document.createElement('p');
    author.innerText = book.author;
    display.appendChild(author);

    const pages = document.createElement('p');
    pages.innerText = `${book.pages} pages`;
    display.appendChild(pages);

    const read = document.createElement('p');
    read.classList.add('read');
    read.innerText = book.read ? 'Read' : 'Not Read';
    display.appendChild(read);

    const toggleReadStatus = document.createElement('button');
    toggleReadStatus.classList.add('readStatus');
    toggleReadStatus.innerText = 'Toggle Status';
    toggleReadStatus.addEventListener('click', () => {
        book.read = !book.read;
        read.innerText = book.read ? 'Read' : 'Not Read';
    });
    display.appendChild(toggleReadStatus);

    const del = document.createElement('button');
    del.classList.add('entryDel');
    del.innerText = 'Delete';
    del.addEventListener('click', () => {
        const index = display.getAttribute('data-index');
        myLibrary.splice(index, 1);
        document.querySelector('.content').removeChild(display);
        updateCardIndices();
    });
    display.appendChild(del);

    document.querySelector('.content').appendChild(display);
}

// Function to update card indices
function updateCardIndices() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.setAttribute('data-index', index);
    });
}

function addBookToLibrary() {
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const pagesInput = document.getElementById('pages');
    const checkInput = document.getElementById('check');

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = checkInput.checked;

    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    console.log(myLibrary);

    // Clear input fields
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    checkInput.checked = false;
}
