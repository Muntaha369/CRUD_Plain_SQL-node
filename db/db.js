const mysql = require('mysql2/promise')

const createConnection = async() => { 
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_host,
      user: process.env.DB_User,
      password: process.env.DB_password
    });
    
    const [databases] = await db.execute('SHOW DATABASES');
    const MappedDb = databases.find((val) => val.Database === 'monsql');
    
    if (!MappedDb) {
      await db.execute('CREATE DATABASE monsql');
      console.log('✅ Database "monsql" created');
    }
    
    await db.end();
    
    const dbWithDatabase = await mysql.createConnection({
      host: process.env.DB_host,
      user: process.env.DB_User,
      password: process.env.DB_password,
      database: 'monsql'  
    });
    
    console.log('✅ Connected to database "monsql"');
    
    await dbWithDatabase.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Table "users" is ready');
    
    return dbWithDatabase;
    
  } catch (error) {
    console.error(error);
  }
}

module.exports = createConnection