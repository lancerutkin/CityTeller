const router = require('express').Router();
const { postNewMerchant, getProximateAddresses } = require('./controllers');

router.post('/address', postNewMerchant);

router.get('/address', getProximateAddresses);

module.exports = router;