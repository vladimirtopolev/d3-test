const mongoose = require('mongoose');

const { Schema } = mongoose;

const CatalogCharacteristicItem = new Schema({
    typeCharacteristic: 'string',
    pattern: String,
    type: String,
    series: String,
    idUser: String,
    points: [{ x: Number, y: Number }]
});

const CatalogCharacteristic = new Schema({
    name: String,
    type: String,
    items: [CatalogCharacteristicItem]
});

module.exports = mongoose.model('CatalogCharacteristic', CatalogCharacteristic);
