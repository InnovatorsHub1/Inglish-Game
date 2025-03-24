const mongoose = require('mongoose');

const SentenceSchema = new mongoose.Schema({
  text: { type: String, required: true },
  missingWord: { type: String, required: true },
  options: [{ type: String, required: true }], // שלוש אפשרויות להשלמה
});

const Sentence = mongoose.model('Sentence', SentenceSchema);

module.exports = Sentence;
