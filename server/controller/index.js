let express = require('express');
let router = express.Router();

/* Display home page */
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home' });
  };

  /* Display faculties page */
  module.exports.displayFacultiesPage = (req, res, next) => {
    res.render('index', { title: 'Faculties' });
  };

  /* Display feedback page */
  module.exports.displayFeedbackPage = (req, res, next) => {
    res.render('index', { title: 'Feedback' });
  };

  module.exports.displayLoginPage = (req, res, next) => {
    if(!req.user)
  {
    res.render('auth/login',
    {
      title:'Login',
      message: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName:''
    })
  }
  else{
    return res.redirect('/')
  }
}


module.exports.processLoginPage = (req,res,next) => {
  passport.authenticate('local',(err,User,info)=> 
  {
      // server error
      if(err)
      {
        return next(err);
      }
      // login error
      if(!User)
      {
        req.flash('loginMessage',
        'AuthenticationError');
        return res.redirect('/login')
      }
      req.login(User,(err)=>{
        if(err)
        {
          return next(err)
        }
        return res.redirect('/course-list');
      })
  })(req,res,next)
}

module.exports.displayRegisterPage = (req, res, next) => {
    if(!req.user)
  {
    res.render('auth/register',
    {
      title:'Register',
      message: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName: ''
    })
  }
  else{
    return res.redirect('/home')
  }
}

module.exports.processRegisterPage = (req,res,next) => {
    let newUser = new User({
    username: req.body.username,
    // password: req.body.password,
    email: req.body.email,
    displayName: req.body.displayName
  })
  User.register(newUser, req.body.password,(err) => {
    if(err)
    {
      console.log("Error in inserting new User");
      if(err.name =='UserExistError')
      {
        req.flash('registerMessage',
        'Registration Error : User already Exist'
      )}
      return res.render('auth/register',
      {
        title:'Register',
        message: req.flash('registerMessage'),
        displayName: req.user ? req.user.displayName:''
      })
    }
    else{
      return passport.authenticate('local')(req,res,()=>{
        res.redirect('/course-list');
      })
    }
  })
}

module.exports.performLogoutPage = (req, res, next) => {
  req.logout();
  res.redirect('/')
}

