const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Homepage
router.get('/', async (req, res) => {
  try {
    // const postData = await Post.findAll({
    //   include: [{ model: User }],
    // });

    // const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      // posts,
      // logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// Dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
