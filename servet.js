const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// --- DATABASE CONNECTION ---
const dbURI = 'mongodb+srv://Cluster0:atifkhan809047@cluster0.trr6.mongodb.net/myMediaDB?retryWrites=true&w=majority';

mongoose.connect(dbURI)
  .then(() => console.log("✅ Database Connected!"))
  .catch(err => console.log("❌ Connection Error: ", err));

// Database Model
const Link = mongoose.model('Link', new mongoose.Schema({
  url: String,
  createdAt: { type: Date, default: Date.now }
}));

// --- SETTINGS ---
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// --- ROUTES ---

// 1. Home Page (Links dikhane ke liye)
app.get('/', async (req, res) => {
  const allLinks = await Link.find().sort({ createdAt: -1 });
  res.render('index', { links: allLinks });
});

// 2. Link Save karne ke liye
app.post('/save', async (req, res) => {
  if (req.body.mediaURL) {
    const newLink = new Link({ url: req.body.mediaURL });
    await newLink.save();
  }
  res.redirect('/');
});

app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
