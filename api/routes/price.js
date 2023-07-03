var express = require('express');
const joiValidation = require('../middlewares/joiValidation');
const auth = require('../middlewares/auth');
const { } = require('../schemas');
var router = express.Router();
const priceService = require('../services/price');
// auth.ensureSignedIn,

router.post('/create',  async (req, res) => {
  const { product, price, source } = req.body;
  const result = await priceService.create({ product, price, source })
  res.json(result);
})

// all itens
router.get('/all',async (req, res) => {
  // to do
    const result = await priceService.findAll();
    res.json(result);
})




module.exports = router