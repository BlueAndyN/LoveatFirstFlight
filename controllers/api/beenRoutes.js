const router = require('express').Router();
const { Been } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const beenData = await Been.create({
      state_name: req.body.state_name,
      user_id: req.session.user_id,
    });

    res.status(200).json(beenData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const beenData = await Been.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!beenData) {
      res.status(404).json({ message: 'No been state with this id...' });
      return;
    }

    res.status(200).json(beenData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
