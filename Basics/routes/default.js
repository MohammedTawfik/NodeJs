const express = require('express');
const path = require('path');
const router = express.Router();

const routeDir = require('../utils/path');

router.use((req, res, next) => {
  res.status(404).sendFile(path.join(routeDir, 'views', '404.html'));
});

module.exports = router;
