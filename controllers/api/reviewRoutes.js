const router = require('express').Router();
const { Review } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const reviewData = await Review.create({
      review: req.body.review,
      been_id: req.body.been_id,
      user_id: req.session.user_id,
    });

    res.status(200).json(reviewData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!reviewData) {
      res.status(404).json({ message: 'No review found with this id...' });
      return;
    }

    res.status(200).json(reviewData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
