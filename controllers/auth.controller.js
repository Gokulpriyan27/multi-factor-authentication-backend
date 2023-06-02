const User = require('../models/authModel');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  const { email, password, googleId,username } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    let hashedPassword;

    if (password) {
      // Hash the password if registering with email/password
      const salt = bcrypt.genSaltSync(10);
      hashedPassword = bcrypt.hashSync(password, salt);
    }

    // Create a new user
    const newUser = new User({
      email: email,
      password: hashedPassword,
      username:username
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user', error: error });
  }
};


const loginUser = async (req, res) => {
 

  try {
    // Check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email' });
    }else if(user.googleId){
      return res.status(400).json({message:"Registered with google! Try sign in with google"})
    }

    
    
    // Compare the entered password with the hashed password
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const {email,username,_id}=user;

    return res.status(201).json({message:"Login Successful",data:{email,username,_id}})
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to log in' });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie();
  req.logout((err)=>{
    if(err){
      return res.status(400).send({message:"Logout failed",error:err})
    }
    return res.status(200).send({message:"Logout successful"})
  });
  
};

const authSuccess = (req,res)=>{
  try {
    console.log(req.user,"req.user details")
    if(req.user){
      return res.status(201).send({data:req.user})
    }
  } catch (error) {
    return res.status(400).send({message:"Authentication Failed"})
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authSuccess
};
