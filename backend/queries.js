const dotenv = require('dotenv')
 dotenv.config()

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'postgres',
    password: process.env.DB_PASSWORD || undefined,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
  })
  const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        console.error('Error fetching users:', error)
        response.status(500).json({ error: error.message })
        return
      }
      response.status(200).json(results.rows)
    })
  }
  
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        console.error('Error fetching user by id:', error)
        response.status(500).json({ error: error.message })
        return
      }
      if (results.rows.length === 0) {
        response.status(404).json({ error: 'User not found' })
        return
      }
      response.status(200).json(results.rows[0])
    })
  }
  const createUser = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        console.error('Error creating user:', error)
        response.status(500).json({ error: error.message })
        return
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
  }
  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          console.error('Error updating user:', error)
          response.status(500).json({ error: error.message })
          return
        }
        if (results.rowCount === 0) {
          response.status(404).json({ error: 'User not found' })
          return
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
}
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        console.error('Error deleting user:', error)
        response.status(500).json({ error: error.message })
        return
      }
      if (results.rowCount === 0) {
        response.status(404).json({ error: 'User not found' })
        return
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }