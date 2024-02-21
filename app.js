let myLibrary = [];
let lastBookID = 0;

function Book(title, author, pages, isRead) {
	this.bookID = ++lastBookID;
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.isRead = isRead;
	this.info = function() {
		return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead}`
	};
}

const TheHobbit = new Book('The Hobbit', 'Tolkien', '350', 'yes');
const AnyTime = new Book('Any Time', 'Howard Smith', '401', 'no');
myLibrary.push(TheHobbit, AnyTime);

let addBookButton = document.getElementById('add-book');
addBookButton.addEventListener('click', addBookToLibrary);

function displayLibrary() {
	const library = document.getElementById('library');

	myLibrary.forEach(book => {
		const bookContainer = createBookElement(book);
		library.appendChild(bookContainer);
	});
}

function createBookElement(book) {
	const bookContainer = document.createElement('div');
	bookContainer.classList.add('book-container');
    const bookTitle = book.title.replace(/\s+/g, '-');
    bookContainer.classList.add(bookTitle);

	const bookDiv = document.createElement('div');
	bookDiv.classList.add('book');
	bookDiv.dataset.bookid = book.bookID;

	const bookInfoDiv = document.createElement('div');
	bookInfoDiv.classList.add('book-info');

	const titlePara = document.createElement('p');
	const authorPara = document.createElement('p');
	const pagesPara = document.createElement('p');
	const isReadPara = document.createElement('p');
	const deleteButton = document.createElement('button');
	deleteButton.classList.add('delete-button')

	titlePara.textContent = `Title: ${book.title}`;
	authorPara.textContent = `Author: ${book.author}`;
	pagesPara.textContent = `Pages: ${book.pages}`;
	deleteButton.textContent = 'X';

	const isReadLabelYes = document.createElement('label');
	const isReadInputYes = document.createElement('input');
	const isReadSpanYes = document.createElement('span');
	const isReadLabelTextYes = document.createTextNode('Yes');

	const isReadLabelNo = document.createElement('label');
	const isReadInputNo = document.createElement('input');
	const isReadSpanNo = document.createElement('span');
	const isReadLabelTextNo = document.createTextNode('No');

	isReadInputYes.type = 'radio';
	isReadInputYes.name = `isRead${book.bookID}`;
	isReadInputYes.value = 'yes';
	isReadSpanYes.classList.add('radio-custom');
	isReadLabelYes.classList.add('radio-label');
	isReadLabelYes.appendChild(isReadInputYes);
	isReadLabelYes.appendChild(isReadSpanYes);
	isReadLabelYes.appendChild(isReadLabelTextYes);

	isReadInputNo.type = 'radio';
	isReadInputNo.name = `isRead${book.bookID}`;
	isReadInputNo.value = 'no';
	isReadSpanNo.classList.add('radio-custom');
	isReadLabelNo.classList.add('radio-label');
	isReadLabelNo.appendChild(isReadInputNo);
	isReadLabelNo.appendChild(isReadSpanNo);
	isReadLabelNo.appendChild(isReadLabelTextNo);

	if (book.isRead === 'Yes') {
		isReadInputYes.checked = true;
	} else {
		isReadInputNo.checked = true;
	}

	isReadPara.textContent = 'Read: ';
	isReadPara.appendChild(isReadLabelYes);
	isReadPara.appendChild(isReadLabelNo);

	bookInfoDiv.appendChild(titlePara);
	bookInfoDiv.appendChild(authorPara);
	bookInfoDiv.appendChild(pagesPara);
	bookInfoDiv.appendChild(isReadPara);

	bookDiv.appendChild(bookInfoDiv);
	bookDiv.appendChild(deleteButton);
	bookContainer.appendChild(bookDiv);

	isReadInputYes.addEventListener('change', function() {
		book.isRead = 'yes';
        console.log('Book Updated:', book);
	});
	isReadInputNo.addEventListener('change', function() {
		book.isRead = 'no';
        console.log('Book Updated:', book);
	});
	return bookContainer;
}

function addBookToLibrary() {
	let title = prompt('Enter book title:');
	if (title === '' || title === null) {
		return;
	}
	let author = prompt('Enter book author:');
	if (author === '' || author === null) {
		return;
	}
	let pagesStr = prompt('Enter number of pages:');
	if (pagesStr === null || pagesStr === '') {
		return;
	}
	let pages = parseInt(pagesStr);
	if (isNaN(pages) || pages <= 0) {
		alert('Please enter a valid number of pages.');
		return;
	}
	let isRead = confirm('Have you read this book?');
	let newBook = new Book(title, author, pages, isRead ? 'Yes' : 'No');
	myLibrary.push(newBook);
    myLibrary.forEach((book, index) => {
        book.bookID = index + 1;
    });
	const library = document.getElementById('library');
	const newBookContainer = createBookElement(newBook);
	library.appendChild(newBookContainer);
    const deleteButton = newBookContainer.querySelector('.delete-button');
    deleteButton.addEventListener('click', function(event) {
        const bookContainerElementToRemove = event.target.closest('.book-container');
        removeBookElement(bookContainerElementToRemove);
    });
}

const bookContainers = document.querySelectorAll('.book-container');

bookContainers.forEach(container => {
	const radioInputs = container.querySelectorAll('input[type="radio"]');
	radioInputs.forEach(input => {
		input.addEventListener('change', function(event) {
			const status = event.target.value;
			const bookID = container.querySelector('.book').dataset.bookid;
			const book = myLibrary.find(book => book.bookID === parseInt(bookID));
			book.isRead = status;	
		});
	});
    
    const deleteButtons = container.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const bookContainerElementToRemove = event.target.closest('.book-container');
            removeBookElement(bookContainerElementToRemove);
        });
    });
});

function removeBookElement(bookContainerElement) {
    const bookIDToRemove = parseInt(bookContainerElement.querySelector('.book').dataset.bookid);
    myLibrary = myLibrary.filter(book => book.bookID !== bookIDToRemove);
    myLibrary.forEach((book, index) => {
        book.bookID = index + 1;
    });
    bookContainerElement.parentElement.removeChild(bookContainerElement);

}

function debugEventListener() {
    console.log(myLibrary)
}
const log = document.getElementById('console');
log.addEventListener('click', debugEventListener);