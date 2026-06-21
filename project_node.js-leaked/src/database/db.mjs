import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

sqlite3.verbose()

// Resolve absolute path relative to this file
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbPath = path.resolve(__dirname, '../../mydatabase.db')

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Failed to open database:', err.message)
  } else {
    console.log('✅ Connected to SQLite at', dbPath)
  }
})

export default db