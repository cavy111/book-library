let myLibrary = []

let dialog = document.querySelector('dialog')
const tableElement = document.querySelector('table')
let closeDialogBtn = document.querySelector('.close-modal')
let openDialogBtn = document.querySelector('.open-modal')
const form = document.querySelector('form');
const tableRows = document.querySelectorAll('tr')

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const formdata = new FormData(form)
    
    const title = formdata.get('title')
    const author = formdata.get('author')
    const isread =formdata.get('is-read') === 'true' ? true : false
    const pages = formdata.get('pages')            

    addBookToLibrary(title,author,pages,isread)
    dialog.close()
    displayBooks()
    form.reset()
})

closeDialogBtn.addEventListener('click',()=>{
    dialog.close()
})

openDialogBtn.addEventListener('click', ()=>{
    dialog.showModal()
})

function Book(title,author,pages,isread){
    this.title = title
    this.author = author
    this.pages = pages
    this.isread = isread
    this.id = crypto.randomUUID()

    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isread ? 'read' : 'not read yet'}`;
        
    }
}

Book.prototype.toggleReadStatus = function(){
    this.isread = !this.isread
}

function addBookToLibrary(title,author,pages,isread){
    let book = new Book(title,author,pages,isread)
    myLibrary.push(book)
}

function displayBooks(){
    tableElement.textContent = ''
    const thead = document.createElement('thead')
    const tableHeaders = ['title','author','pages','status','actions']
    tableHeaders.forEach(tableHeader=>{
        const th = document.createElement('th')
        th.textContent = tableHeader
        thead.append(th)
    })
    tableElement.append(thead)
    for (let i = 0 ; i<myLibrary.length; i++){
        let row = document.createElement('tr')

        let td_title = document.createElement('td')
        td_title.textContent=myLibrary[i].title
        row.appendChild(td_title)

        let td_author = document.createElement('td')
        td_author.textContent = myLibrary[i].author
        row.appendChild(td_author)

        let td_pages = document.createElement('td')
        td_pages.textContent = myLibrary[i].pages
        row.appendChild(td_pages)

        let td_status = document.createElement('td')
        td_status.textContent = myLibrary[i].isread === true ? 'read' : 'not read yet'
        row.appendChild(td_status)

        let td_remove_btn = document.createElement('button')
        td_remove_btn.textContent = 'remove'
        td_remove_btn.addEventListener('click',()=>{
            myLibrary = myLibrary.filter((item)=>item.id!==myLibrary[i].id)
            displayBooks()
        })
        row.appendChild(td_remove_btn)
        
        let td_toggle_status_btn = document.createElement('button')
        td_toggle_status_btn.textContent = 'change status'
        td_toggle_status_btn.addEventListener('click',()=>{
            myLibrary[i].toggleReadStatus()
            displayBooks()
        })
        row.appendChild(td_toggle_status_btn)

        tableElement.append(row)
    }
}

displayBooks()