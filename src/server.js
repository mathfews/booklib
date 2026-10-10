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

app.get("/books/:id", (req,res) => {
    const id = req.params.id
    const selectedBook = books.find(book => book.id == id)
    res.send(selectedBook != undefined ? selectedBook : "Book not found")
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})