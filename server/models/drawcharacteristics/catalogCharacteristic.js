import mongoose from 'mongoose';

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

export default mongoose.model('CatalogCharacteristic', CatalogCharacteristic);