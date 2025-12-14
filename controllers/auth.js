const { getDB } = require('../db/db')

const signup = async(req, res) => {
  try {
    const {email, password} = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        msg: "Email and password are required" 
      });
    }
    
    const db = getDB();
    
    const [result] = await db.execute(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, password]
    );
    
    res.status(201).json({
      msg: "User created successfully",
      userId: result.insertId,
      email
    });
    
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ 
        msg: "Email already exists" 
      });
    }
    
    console.error(error);
    res.status(500).json({ 
      msg: "Error creating user",
      error: error.message 
    });
  }
}

module.exports = {signup}