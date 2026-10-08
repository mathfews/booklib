import http from "node:http"

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
    console.log(myUrl)
    if (req.url == "/") {
        res.write(JSON.stringify("home page"))
    }
    else if ((req.url == "/books" || req.url.includes("/books/")) && req.method == "GET") {
        const id = Number(myUrl.pathname.slice(7))
        if (id != "") {
            const selectedBook = books.find((book) => book.id == id)
            res.statusCode = selectedBook == undefined ? 404 : 200
            res.write(JSON.stringify(selectedBook == undefined ? "Book not found." : selectedBook))
        }
        else {
            res.write(JSON.stringify(books))
        }
    }
    else {
        res.statusCode = 404
        res.write(JSON.stringify("404 - not found"))
    }
    res.end()
})

server.listen(3000, () => {
    console.log(`Server running at http://localhost:${port}`)
})