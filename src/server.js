import http from "node:http"
import url from "node:url"

const port = 3000

const server = http.createServer((req, res) => {
    res.end(JSON.stringify("Hello, it's running!"))
})

server.listen(3000, () => {
    console.log(`Server running at http://localhost:${port}`)
})