const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
  
  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) return res.sendStatus(401);

  try {
    const user = await User.login(email, password)
    const roles = Object.values(foundUser.roles).filter(Boolean);
    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token, roles})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.signup(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// give admin
const promoteUser = async (req, res) => {
  const update = {roles: {User: 1000, Admin: 2000}}
  const filter = {email: req.params.email}
  const updatedDocument = await User.findOneAndUpdate(filter, update);

  return res.status(200).send(updatedDocument);
}

// get all users
const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ 'message': 'No users found' });
  res.json(users);
}

module.exports = { signupUser, loginUser, promoteUser, getAllUsers }