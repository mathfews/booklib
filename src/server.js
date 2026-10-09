import http from "node:http"
import { parse } from "node:path"

const port = 3000

const books = [
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
})

server.listen(3000, () => {
    console.log(`Server running at http://localhost:${port}`)
})