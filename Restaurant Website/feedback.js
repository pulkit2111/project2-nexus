const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Set up middleware for parsing JSON
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/cafeteria');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// feedback schema
const feedbackSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  emailAddress: String,
  phoneNumber: String,
  userFeedback: String
} ,{ versionKey: false });

const Feedback = mongoose.model('feedbacks', feedbackSchema);

app.get('/', (req, res) => {
   res.render('index');
});

app.get('/menu', (req, res) => {
  res.render('menu');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

// Handle feedback form submissions
app.post('/submit-feedback', async (req, res) => {
  try {
    const feedbackData = req.body;
    const newFeedback = new Feedback(feedbackData);
    await newFeedback.save();
    res.status(201).json({message: 'Feedback submitted successfully!'});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
