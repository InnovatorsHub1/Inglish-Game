const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  english: { type: String, required: true },
  correctTranslation: { type: String, required: true },
  wrongTranslation1: { type: String, required: true },
  wrongTranslation2: { type: String, required: true },
  category: { type: String, required: true },
  audioFile: { type: String } // שדה חדש לקובץ האודיו
});

const Word = mongoose.model('Word', WordSchema);

module.exports = Word;
