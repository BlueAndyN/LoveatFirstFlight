const router = require('express').Router();
const userRoutes = require('./userRoutes');
const beenRoutes = require('./beenRoutes');
const plannedRoutes = require('./plannedRoutes');
const reviewRoutes = require('./reviewRoutes');

router.use('/users', userRoutes);
router.use('/been', beenRoutes);
router.use('/planned', plannedRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
