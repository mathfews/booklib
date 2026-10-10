import http from "node:http"

const port = 3000

let books = [
    {
        "id": 1,
        "title": "The Pragmatic Programmer",
        "author": "Andrew Hunt"
    },
    {
        "id": 2,
        "title": "Clean Code",
        "author": "Robert C. Martin"
    }
]

const server = http.createServer((req, res) => {
    const myUrl = new URL(req.url, `https://${req.headers.host}`)
    if (req.url == "/") {
        res.end(JSON.stringify("home page"))
    }
    else if (req.method == "GET") {
        if (req.url == "/books" || req.url.includes("/books/")) {
            const id = Number(myUrl.pathname.slice(7))
            if (id != "") {
                const selectedBook = books.find((book) => book.id == id)
                res.statusCode = selectedBook == undefined ? 404 : 200
                res.end(JSON.stringify(selectedBook == undefined ? "Book not found." : selectedBook))
            }
            else {
                res.end(JSON.stringify(books))
            }
        }
        else {
            res.statusCode = 404
            res.end(JSON.stringify("404 - not found"))
        }
    }
    else if (req.method == "POST") {
        let body = ''

        req.on('data', chunk => {
            body += chunk
        })

        if (req.url == "/books") {
            req.on('end', () => {
                let parsedContent = JSON.parse(body)
                books.push(parsedContent)
                res.statusCode = 201
                console.log(`The book, ${parsedContent.title}, was succesfully added!`)
                res.end(JSON.stringify(parsedContent))
            })
        }
    }
    else if (req.method == "DELETE") {
        if (req.url.includes("/books/")) {
            const id = Number(myUrl.pathname.slice(7))
            const deletedBook = books.find(book => book.id == id)
            if (deletedBook != undefined) {
                const booksFiltered = books.filter(book => book.id != id)
                books = booksFiltered
                console.log(`The book, ${deletedBook.title} was succesfully deleted.`)
                res.statusCode = 204
                res.end()
            }
            else {
                res.statusCode = 404
                console.log("Book not found")
                res.end(JSON.stringify("Book not found"))
            }
        }
    }
})

server.listen(3000, () => {
    console.log(`Server running at http://localhost:${port}`)
})