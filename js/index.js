var siteNameInput = document.getElementById('siteName');
var siteURLInput = document.getElementById('siteURL');
var submitbtn = document.getElementById('submitBtn');
var booksContainer;
if (localStorage.getItem('books') == null) {
    booksContainer = [];
} else {
    booksContainer = JSON.parse(localStorage.getItem('books'));
    displayBooks();
}
var urlIndex;
function addBook() {
    if (validUrl(urlIndex) == true) {
        var books = {
            bookName: siteNameInput.value,
            bookUrl: siteURLInput.value
        }
        booksContainer.push(books);
        clearForm();
        displayBooks();
        localStorage.setItem('books', JSON.stringify(booksContainer));
    } else {
        alert('Invalid URL Formats')
    }
}
function clearForm() {
    siteNameInput.value = null;
    siteURLInput.value = null;
}
function displayBooks() {
    var cartona = ``;
    for (var i = 0; i < booksContainer.length; i++) {
        // var link = booksContainer[i].bookUrl.trim();
        // if (!link.startsWith('http://') && !link.startsWith('https://')) {
        //     link = `http://${link}`;
        // }
        var link = booksContainer[i].bookUrl;
        console.log(link);
        cartona += `
        <tr>
        <th scope="row">${i + 1}</th>
        <td>${booksContainer[i].bookName}</td>
        <td><a href="${link}" class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i> Visit</a></td>
        <td><button onclick="deleteBook(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>
        `
        document.getElementById('tableContent').innerHTML = cartona;
    }
}

function deleteBook(deleteIndex) {
    booksContainer.splice(deleteIndex, 1);
    displayBooks();
    localStorage.setItem('books', JSON.stringify(booksContainer));
}

function validUrl(element) {
    urlIndex=element;
    regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
    if (regex.test(element.value)) {
        submitbtn.classList.remove('disabled')
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        element.nextElementSibling.classList.replace('d-block', 'd-none');
        return true;
    } else {
        submitbtn.classList.add('disabled')
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        element.nextElementSibling.classList.replace('d-none', 'd-block');
        return false;
    }

}
