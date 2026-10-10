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
    const id = Number(req.params.id)
    const selectedBook = books.find(book => book.id == id)
    res.statusCode = selectedBook != undefined ? 200 : 404
    res.send(selectedBook != undefined ? selectedBook : "Book not found")
})

app.delete("/books/:id", (req, res) => {
    const id = Number(req.params.id)
    const selectedBook = books.find(book => book.id === id)
    if (selectedBook != undefined) {
        const filteredBooks = books.filter(book => book.id !== id)
        books = filteredBooks
        console.log(`The book, ${selectedBook.title} was sucessfully deleted.`)
        res.statusCode = 204
        res.end()
    }
    else {
        res.statusCode = 404
        res.send("Book not found.")
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})