import http from "node:http"
import url from "node:url"

const port = 3000

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        res.write(JSON.stringify("home page"))
    }
    else if (req.url == "/books" && req.method == "GET") {
        res.write(JSON.stringify("books route"))
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