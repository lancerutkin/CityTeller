const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/merchants_test';

mongoose.connect(mongoURL, {useNewUrlParser: true, useCreateIndex: true}, () => {
  console.log('Connected to mongo');
});

const Schema = mongoose.Schema;

const MerchantSchema = new Schema({
  storeName: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
  minimumPurchase: Number,
  chargeFlat: Number,
  chargePercent: Number,
  lat: {
    type: Number,
    index: true
  },
  lng: {
    type: Number,
    index: true
  }
});

const Merchant = mongoose.model('Merchant', MerchantSchema);

module.exports = {
  createMerchant: (vendor) => {
    return Merchant.create(vendor)
  },
  readProximateMerchants: (lat, lng, latRange, lngRange) => {
    return Merchant.find({lat: {$gte: lat - latRange, $lte: lat + latRange}, 
    lng: {$lte: lng - lngRange, $gte: lng + lngRange}});
  }
}