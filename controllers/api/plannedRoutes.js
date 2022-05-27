const router = require('express').Router();
const { Planned } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const plannedData = await Planned.findAll();

    res.status(200).json(plannedData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// add withAuth
router.post('/', async (req, res) => {
  try {
    const plannedData = await Planned.create({
      state_name: req.body.state_name,
      user_id: req.session.user_id,
    });

    res.status(200).json(plannedData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// add withAuth
router.delete('/:id', async (req, res) => {
  try {
    const plannedData = await Planned.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!plannedData) {
      res
        .status(404)
        .json({ message: 'No planned state found with this id...' });
      return;
    }

    res.status(200).json(plannedData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
