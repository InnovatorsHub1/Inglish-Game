const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');  // ייבוא multer
const User = require('./models/User');
const Sentence = require('./models/Sentence');
const Word = require('./models/Word');
const Admin = require('./models/Admin');

const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());

// הגדרת multer לטיפול בקבצים
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // נתיב התיקייה לשמירת הקבצים
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // שם הקובץ
  },
  onError: (err, next) => { // הוספת טיפול בשגיאות
    console.error('Multer error:', err); // רישום השגיאה בקונסולה
    next(err); // העברת השגיאה לטיפול הבא
  }
});
const upload = multer({ storage });

mongoose.connect('mongodb://localhost:27017/englishGame', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// נתיב להוספת מילים
app.post('/api/words', upload.single('audioFile'), async (req, res) => {
  const { english, correctTranslation, wrongTranslation1, wrongTranslation2, category } = req.body;
  try {
    const newWord = new Word({ 
      english, 
      correctTranslation, 
      wrongTranslation1, 
      wrongTranslation2, 
      category,
      audioFile: req.file ? req.file.filename : null // שמירת שם הקובץ במאגר הנתונים
    });
    await newWord.save();
    res.status(201).json(newWord);
  } catch (error) {
    res.status(500).json({ message: 'Error adding word.' });
  }
});

// נתיב לשליפת מילים לפי קטגוריה
app.get('/api/words/:category', async (req, res) => {
  try {
    const words = await Word.find({ category: req.params.category });
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching words' });
  }
});

// נתיב להתחברות מנהלים
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    res.json({ message: 'Admin logged in successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

// נתיב להתחברות
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

// נתיב לשליפת משתמש לפי ID
app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

// נתיב לעדכון משתמש לפי ID
app.put('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user data' });
  }
});

// נתיבים נוספים...

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
