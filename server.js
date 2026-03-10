const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const app = express();
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ videos: [] }).write();
app.use(express.json());
app.use(express.static('public'));

const ADMIN_PASS = "809047";

// Login API
app.post('/api/login', (req, res) => {
    if (req.body.pass === ADMIN_PASS) {
        res.json({ success: true, token: "809047_verified" });
    } else {
        res.status(401).json({ success: false });
    }
});

// Add Video API
app.post('/api/add-video', (req, res) => {
    const { title, link, size, token } = req.body;
    if (token === "809047_verified" && parseFloat(size) <= 200) {
        db.get('videos').push({ title, link, size: size + "MB" }).write();
        res.json({ success: true });
    } else {
        res.status(400).json({ message: "Invalid data or size > 200MB" });
    }
});

// Get Videos API
app.get('/api/get-videos', (req, res) => {
    res.json(db.get('videos').value());
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Server is live on port " + PORT));
