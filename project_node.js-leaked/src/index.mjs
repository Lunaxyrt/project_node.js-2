import express from 'express'
import db from './db.mjs'
import initDB from './src/database/initDB.mjs'

initDB()

const app = express()
app.use(express.json())

app.post('/register', (req, res) => {
    const { username, password, email } = req.body

    db.run(
        `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`,
        [username, password, email],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message })
            }
            res.json({ success: true, id: this.lastID })
        }
    )
})

app.listen(3000, () => console.log('Server running'))


