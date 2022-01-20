const { localsName } = require("ejs");
const Database = require("../database");
let database = require("../database");
const authControllerCore = require("./core_auth_controller")

let authController = {

  // Get a Register User Page 
  registerNew: (req, res) => {
    res.locals.item = "auth";
    res.render('auth/register')
  },

  // Register a New User 
  register: (req, res) => {
    let userObj = req.body;
    authControllerCore.registerUser(userObj)
        .then(userObj => authControllerCore.loginUser(userObj.username, userObj.password))
        .then(() => res.redirect('/reminders'))
        .catch(err => console.log(err))        
  }, 

  // Get a Login User Page
  loginNew: (req, res) => {
    res.locals.item = "auth";
    res.render('auth/login')
  },

  // Login a user
  login: (req, res) => {
    let userObj = req.body;
    authControllerCore.loginUser(userObj.username, userObj.password)
        .then(() => res.redirect('/reminders'))
        .catch(err => console.log(err))
  }
}


module.exports = authController;