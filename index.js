require('dotenv').config()
const express = require('express');
const mysql = require('mysql2')
const app = express();
const PORT =  3000;

const createConnection = async()=>{ 
 try {
  const connection = await mysql.createConnection({
   host:process.env.DB_host,
   user:process.env.DB_User,
   password:process.env.DB_password
 })
 console.log("Connection created")
 } catch (error) {
  console.error(error)
 }
}

app.use(express.json()); 


app.get('/', (req, res) => {
  res.json({ message: 'API is running successfully', timestamp: new Date() });
});


app.post('/api/data', (req, res) => {
  const data = req.body;
  console.log("Received:", data);
  res.status(201).json({ message: "Data received", data });
});


createConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
});