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

const login = async(req, res)=>{
  const {email, password} = req.body; 

  const db = getDB();

  if (!email || !password) {
      return res.status(400).json({ 
        msg: "Email and password are required" 
      });
  }

const [rows] = await db.execute(
  'SELECT email FROM users WHERE email = ?',
  [email]
);

const checkEmail = rows[0];

console.log("TEST 1", rows)
console.log("TEST 2", rows[0])

if(!checkEmail){
  return res.json({msg:"Invalid credential"})
}

return res.json({msg:"Email exists", checkEmail})

}

module.exports = { signup, login }