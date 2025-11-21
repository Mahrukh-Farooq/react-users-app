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

async function testConnection() {
    console.log('Testing database connection...')
    console.log('Config:', {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'postgres',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
    })

    try {
        // Test connection
        const client = await pool.connect()
        console.log('✅ Database connection successful!')
        
        // Check if users table exists
        const tableCheck = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'users'
            );
        `)
        
        if (tableCheck.rows[0].exists) {
            console.log('✅ Users table exists!')
            
            // Count users
            const countResult = await client.query('SELECT COUNT(*) FROM users')
            console.log(`📊 Total users in database: ${countResult.rows[0].count}`)
            
            // Show all users
            const usersResult = await client.query('SELECT * FROM users ORDER BY id ASC')
            console.log('\n📋 Users in database:')
            if (usersResult.rows.length === 0) {
                console.log('   (No users found)')
            } else {
                usersResult.rows.forEach(user => {
                    console.log(`   ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`)
                })
            }
        } else {
            console.log('❌ Users table does NOT exist!')
            console.log('\n💡 Run the following SQL to create the table:')
            console.log(`
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);
            `)
        }
        
        client.release()
        await pool.end()
        process.exit(0)
    } catch (error) {
        console.error('❌ Database connection failed!')
        console.error('Error:', error.message)
        console.error('\n💡 Please check:')
        console.error('   1. PostgreSQL is running')
        console.error('   2. Database credentials in .env file are correct')
        console.error('   3. Database exists')
        await pool.end()
        process.exit(1)
    }
}

testConnection()

