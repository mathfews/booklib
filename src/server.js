import express from "express"

const app = express()

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

app.get("/", (req,res) => {
    res.send("Homepage")
})

app.get("/books", (req,res) => {
    res.json(books)
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})