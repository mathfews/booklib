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

function validateData(input) {
    if ((typeof input != "string") || (input == null || input.trim() == "")) {
        return false
    }
    return true
}

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

    if (!(validateData(title) && validateData(author))) {
        return res.status(400).end()
    }

    const formattedTitle = title.trim()

    const formattedAuthor = author.trim()

    await pool.query("insert into books (title, author) values (? , ?)", [formattedTitle, formattedAuthor]).then(result => {
        res.status(201).end()
    })
})

app.delete("/books/:id", async (req, res) => {
    const id = req.params.id
    await pool.query("delete from books where id = ?", [id]).then(result => {
        result[0].affectedRows === 0 ? res.status(404).json({"message": "Book not found"}) : res.status(204).end()
    })
})

app.patch("/books/:id", async (req, res) => {
    const id = req.params.id

    const {title, author} = req.body

    const avalibleColumns = [title, author, id]

    if (title == null && author == null) {
        return res.status(400).end()
    }
    else {
        await pool.query(`update books set${title == null ? "" : " title = ?"}${author != null && title != null ? "," : ""}${author == null ? "" : "author = ?"} where id = ?`, avalibleColumns.filter(element => element != null)).then(result => {
            result[0].affectedRows === 0 ? res.status(404).json({"message": "Book not found"}) : res.status(200).json({"message": `Book ${id} updated succesfully`})
        })
    }
})

app.put("/books/:id", async (req, res) => {
    const id = req.params.id
    const {title, author} = req.body

    if (!validateData(title, author)) {
        return res.status(400).end()
    }

    const formattedTitle = title.trim()

    const formattedAuthor = author.trim()

    await pool.query("update books set title = ?, author = ? where id = ?", [formattedTitle, formattedAuthor, id]).then(async result => {
        if (result[0].affectedRows != 0) {
            return res.status(200).json({"message": `Book ${id} updated succesfully`})
        }
        else {
            const selectedBook = await pool.query("select * from books where id = ?",[id])
            if (selectedBook[0].length == 0) {
                return res.status(404).end()
            }
            return res.status(200).json({message: `Book ${id} already has these values`})
        }
    })
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})