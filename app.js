const express = require('express');
const mongoose = require('mongoose');

const app1 = express();

// Set up middleware for parsing JSON
app1.use(express.json());
app1.use(express.urlencoded({ extended: true }));

// Serve static files (like CSS, images) from a public folder
app1.use(express.static("public"));

// Set the view engine to use EJS
app1.set('view engine', 'ejs');

const PORT = process.env.PORT || 3003;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/cafeteria');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

let totalPrice;

app1.get('/', (req, res) => {
  totalPrice = req.query.totalPrice || 80;
   res.render('order-now', {totalPrice});
});


const paymentSchema = new mongoose.Schema({
  email: String,
  cardNumber: String,
  expiry: String,
  cvv: String,
  amount: Number
} ,{ versionKey: false });

const Payment = mongoose.model('payments', paymentSchema);

// Handle feedback form submissions
app1.post('/submit-payment', async (req, res) => {
  try {
    const paymentData = {
      // Assuming you have other payment details from the request body
      email: req.body.email,
      cardNumber: req.body.cardNumber,
      expiry: req.body.expiry,
      cvv: req.body.cvv,
      // Use totalPrice in the payment field
      amount: totalPrice
    };

    const newPayment = new Payment(paymentData);
    await newPayment.save();
    res.status(201).send('Payment submitted successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app1.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});