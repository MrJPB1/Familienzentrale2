const express = require('express');
const router = express.Router();

router.get('/mode', (req, res) => {
  res.json({
    mode: 'wall',
    dashboardReturnSeconds: 60,
    frameModeMinutes: 5,
    optimizedFor: 'central-touch-display'
  });
});

module.exports = router;
