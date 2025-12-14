const mysql = require('mysql2/promise')

let db = null
const createConnection = async() => { 
  try {
    const OldDb = await mysql.createConnection({
      host: process.env.DB_host,
      user: process.env.DB_User,
      password: process.env.DB_password
    });
    
    const [databases] = await OldDb.execute('SHOW DATABASES');
    const MappedDb = databases.find((val) => val.Database === 'monsql');
    
    if (!MappedDb) {
      await OldDb.execute('CREATE DATABASE monsql');
      console.log('✅ Database "monsql" created');
    }
    
    await OldDb.end();
    
      db = await mysql.createConnection({
      host: process.env.DB_host,
      user: process.env.DB_User,
      password: process.env.DB_password,
      database: 'monsql'  
    });
    
    console.log('✅ Connected to database "monsql"');
    
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Table "users" is ready');
    
    return db;
    
  } catch (error) {
    console.error(error);
  }
}

const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized. Call createConnection first.');
  }
  return db;
};

module.exports = {createConnection, getDB}