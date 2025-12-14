require('dotenv').config()
const express = require('express');
const app = express();
const { createConnection } = require('./db/db')
const useRouter = require('./routes/router')

app.use(express.json()); 

app.use('/api/auth',useRouter)

app.get('/', (req, res) => {
  res.json({ message: 'API is running successfully', timestamp: new Date() });
});


app.post('/api/data', (req, res) => {
  const data = req.body;
  console.log("Received:", data);
  res.status(201).json({ message: "Data received", data });
});


createConnection().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(` Server is running on http://localhost:${process.env.PORT}`);
  });
});