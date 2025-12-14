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
      console.log('Database "monsql" created');
    }
    
    await db.end();
    
    const dbWithDatabase = await mysql.createConnection({
      host: process.env.DB_host,
      user: process.env.DB_User,
      password: process.env.DB_password,
      database: 'monsql'  
    });
    
    console.log('Connected to database "monsql"');
    return dbWithDatabase;
    
  } catch (error) {
    console.error(error);
  }
}

module.exports = createConnection