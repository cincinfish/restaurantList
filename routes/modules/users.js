const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: 'User already exists.' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    return User.create({
      name,
      email,
      password
    })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout(
    function (err) {
      if (err) { return next(err); }
      req.flash("success_msg", "You have been successfully logged out!")
      res.redirect("/users/login")
    })
})

module.exports = router