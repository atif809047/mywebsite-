const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const app = express();
const adapter = new FileSync('db.json');
const db = low(adapter);

// Database setup (Default videos list)
db.defaults({ videos: [] }).write();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// --- YAHAN APNA PASSWORD SET KAREIN ---
const ADMIN_PASSWORD = "atif123"; 

// Upload Route
app.post('/upload', (req, res) => {
    const { title, link, password } = req.body;

    // Password Check
    if (password !== ADMIN_PASSWORD) {
        return res.send("<h1>Ghalat Password!</h1><p>Wapis jayein aur sahi password dalein.</p>");
    }

    // Save to Database
    db.get('videos').push({ title, link }).write();
    
    // Upload hone ke baad home page par bhej dega
    res.redirect('/');
});

// API to get videos (Home page par dikhane ke liye)
app.get('/api/videos', (req, res) => {
    const videos = db.get('videos').value();
    res.json(videos);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

