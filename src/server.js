import express from "express"
import mysql from "mysql2"

const pool = mysql.createPool({
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "root",
    "database": "booklib"
}).promise()

// TODO: migrate password and username to a .env file

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = 3000

app.get("/", (req,res) => {
    res.send("Homepage")
})

app.get("/books", (req,res) => {
    pool.query("select * from books").then(result => {
        res.json(result[0])
    })
})

app.get("/books/:id", (req,res) => {
    const id = Number(req.params.id)
    pool.query("select * from books where id = ?", [id]).then(result => {
        res.json(result[0].length == 0 ? {"message": "not found"} : result[0])
    }) 
})

app.post("/books", async (req, res) => {
    const {title, author} = req.body
    await pool.query("insert into books (title, author) values (? , ?)", [title, author])
    res.end()
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