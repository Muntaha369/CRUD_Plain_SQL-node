const login = async(req, res)=>{
  const {email, password} = req.body;
  res.json({
    msg:"Got email and password",
    email,
    password
  })
}

module.exports = {login}