const router = require('express').Router();
const { User, Been, Planned } = require('../models');
const withAuth = require('../utils/auth');

// Homepage
router.get('/', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('homepage');
});

// Dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Been }, { model: Planned}],
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

router.get('/feed', withAuth, async (req, res) => {
  try {
    const beenData = await Been.findAll({
      include: [{ model: User }],
    })

    const stateBeen = beenData.map((been) => been.get({ plain: true }));

    res.render('feed', {
      stateBeen,
      logged_in: req.session.logged_in
    });
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router;
