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

async function createUsersTable() {
    console.log('Creating users table...')
    
    try {
        const client = await pool.connect()
        
        // Create users table
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL
            );
        `)
        
        console.log('✅ Users table created successfully!')
        
        // Check if table exists
        const tableCheck = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'users'
            );
        `)
        
        if (tableCheck.rows[0].exists) {
            console.log('✅ Verified: Users table exists!')
            
            // Count users
            const countResult = await client.query('SELECT COUNT(*) FROM users')
            console.log(`📊 Total users in database: ${countResult.rows[0].count}`)
        }
        
        client.release()
        await pool.end()
        console.log('\n✅ Database setup complete! You can now test the API.')
        process.exit(0)
    } catch (error) {
        console.error('❌ Error creating table:', error.message)
        await pool.end()
        process.exit(1)
    }
}

createUsersTable()




