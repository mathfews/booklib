import http from "node:http"
import url from "node:url"

const port = 3000

const books = [
    {
        "id": 1,
        "title": "The Pragmatic Programmer",
        "author": "Andre Hunt"
    },
    {
        "id": 2,
        "title": "Clean Code",
        "author": "Robert C. Martin"
    }
]

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        res.write(JSON.stringify("home page"))
    }
    else if (req.url == "/books" && req.method == "GET") {
        res.write(JSON.stringify(books))
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