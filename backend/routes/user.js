const express = require('express')
const { loginUser, signupUser, promoteUser, getAllUsers } = require('../controllers/userController')
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../config/rolesList');

const router = express.Router()

// login route
router.post('/login', loginUser)

// register a user route
router.post('/signup', signupUser)

// give admin access route
router.post('/promote/:email', promoteUser)

router.route('/all')
    .get(verifyRoles(ROLES_LIST.Admin), getAllUsers)

module.exports = router