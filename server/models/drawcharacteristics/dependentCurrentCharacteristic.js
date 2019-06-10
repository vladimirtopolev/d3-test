import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Example of an entity:
 * {
    id: 2,
    label: "Нормально-инверсная (IEC)",
    type: 'DEPENDENT_CURRENT',
    pattern: 'DEPENDENT_CURRENT',
    variableDescriptions: [{
      label: 'k',
      labelForUser: 'Коэффициент k',
    }, {
      label: 'Isz',
      labelForUser: 'Пусковой ток',
    }],
    fn: 'function(x, variables) {
      var k = variables['k'];
      var Isz = variables['Isz'];
      return k * 0.14 /(Math.pow(x/Isz,0.02)-1);
    }'
  }
 *
 * */

const DependentCurrentCharacteristic = new Schema({
    label: String,
    type: String,
    pattern: String,
    formula: String,
    variableDescriptions: [{
        label: String,
        labelForUser: String
    }],
    fx: String,
    fy: String
});


export default mongoose.model('DependentCurrentCharacteristic', DependentCurrentCharacteristic);