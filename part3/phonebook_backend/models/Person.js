/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const mongoose = require('mongoose');

const url = process.env.URI;

mongoose
  .connect(url)
  .then(() => console.log('mongodb connected'))
  .catch((err) => console.log('error:', err.message));
const validateNumber = (number) => {
  const reg = /^([0-9]{2}|[0-9]{3})-[0-9]{4,20}/;
  return reg.test(number);
};
const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true },
  number: {
    type: String,
    minlength: 8,
    required: true,
    // match: [/^\([0-9]{2}|[0-9]{3})-[0-9]{4,20}$/, "Please enter a valid number"] ,
    validate: [validateNumber, 'Please enter a valid number'],
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
